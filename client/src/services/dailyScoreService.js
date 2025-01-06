import { apiClient } from "./apiClient"

export const getDailyScore = async (date) => {
  const response = await apiClient.get("/daily-score", { params: { date } })
  return response.data
}
