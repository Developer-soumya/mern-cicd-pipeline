import api from "./api";

// Get all tasks
export const getTasks = async () => {
  const response = await api.get("/tasks");

  return response.data;
};

// Create a task
export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);

  return response.data;
};

// Update a task
export const updateTask = async (taskId, taskData) => {
  const response = await api.patch(`/tasks/${taskId}`, taskData);

  return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);

  return response.data;
};
