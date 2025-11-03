import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateTodo, deleteTodo } from '../store';

export default function useTodos() {
  const dispatch = useDispatch();
  const todos = useSelector(s => s.todos);
  const searchTerm = useSelector(s => s.searchTerm);
  const filterStatus = useSelector(s => s.filterStatus);

  const filtered = todos.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterStatus === 'All' ||
                        (filterStatus === 'Completed' ? t.status === 'Completed' : t.status !== 'Completed');
    return matchSearch && matchFilter;
  });

  const grouped = {
    'Pending': filtered.filter(t => t.status === 'Pending'),
    'In Progress': filtered.filter(t => t.status === 'In Progress'),
    'Completed': filtered.filter(t => t.status === 'Completed'),
  };

  const actions = {
    add: (title, desc) => dispatch(addTodo({ title, description: desc })),
    update: (id, updates) => dispatch(updateTodo({ id, updates })),
    remove: (id) => dispatch(deleteTodo(id)),
  };

  return { todos, grouped, actions };
}
