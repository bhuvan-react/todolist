import { configureStore, createSlice } from '@reduxjs/toolkit';
import { mockTodos } from '../data/mockData';

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || mockTodos,
  searchTerm: '',
  filterStatus: 'All',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setFilterStatus(state, action) {
      state.filterStatus = action.payload;
    },
    addTodo(state, action) {
      const { title, description } = action.payload;
      const newTodo = {
        id: Date.now(),
        title,
        description,
        status: 'Pending',
        date: new Date().toISOString(),
      };
      state.todos.push(newTodo);
    },
    updateTodo(state, action) {
      const { id, updates } = action.payload;
      const todo = state.todos.find(t => t.id === id);
      if (todo) Object.assign(todo, updates);
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
  },
});

export const { setSearchTerm, setFilterStatus, addTodo, updateTodo, deleteTodo } = todoSlice.actions;

const store = configureStore({
  reducer: todoSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(() => (next) => (action) => {
      const result = next(action);
      localStorage.setItem('todos', JSON.stringify(store.getState().todos));
      return result;
    }),
});

export default store;
