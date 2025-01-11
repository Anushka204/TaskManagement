import { apiClient } from "./apiClient"

export const getDailyScore = async (date) => {
  const response = await apiClient.get("/daily-score", { params: { date } })
  return response.data
}

export const getDailyTrend = async (cycleId) => {
  const response = await apiClient.get("/daily-score/daily-trend", {
    params: { cycleId },
  })
  return response.data
}

export const getWeeklyTrend = async (cycleId) => {
  const response = await apiClient.get("/daily-score/weekly-trend", {
    params: { cycleId },
  })
  return response.data
}
