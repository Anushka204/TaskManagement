import { apiClient } from "./apiClient"

export const getTasks = async (dueDate) => {
  const response = await apiClient.get("/tasks", { params: { dueDate } })
  return response.data
}

export const createTask = async (task) => {
  const response = await apiClient.post("/tasks", task)
  return response.data
}

export const deleteTask = async (taskId) => {
  const response = await apiClient.delete(`/tasks/${taskId}`)
  return response.data
}

export const updateTask = async (task) => {
  const response = await apiClient.put(`/tasks/${task._id}`, task)
  return response.data
}
