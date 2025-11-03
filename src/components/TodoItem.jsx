import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { formatDate } from "../utils/formatDate";

const statusConfig = {
  Pending: { color: "#ccc", label: "Pending" },
  "In Progress": { color: "#f39c12", label: "In Progress" },
  Completed: { color: "#4caf50", label: "Completed" },
};

const TodoItem = ({ todo, onEdit, onDelete }) => {
  const status = statusConfig[todo.status];

  return (
    <Card sx={{ mb: 2, transition: "0.2s", "&:hover": { boxShadow: 3 } }}>
      <CardContent sx={{ py: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          <Box flex={1} minWidth={0}>
            <Typography
              variant="subtitle1"
              fontWeight="medium"
              noWrap
              sx={{
                textDecoration:
                  todo.status === "Completed" ? "line-through" : "none",
                opacity: todo.status === "Completed" ? 0.6 : 1,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              {todo.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              {todo.description}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              {formatDate(todo.date)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: status.color,
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 500,
                  color: status.color,
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                }}
              >
                {status.label}
              </Typography>
            </Box>

            <IconButton size="small" onClick={() => onEdit(todo)}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(todo.id)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
