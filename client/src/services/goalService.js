import { apiClient } from "./apiClient"

export const createGoal = async (goal) => {
  const response = await apiClient.post("/goals", goal)
  return response.data
}

export const deleteGoal = async (goalId) => {
  const response = await apiClient.delete(`/goals/${goalId}`)
  return response.data
}
