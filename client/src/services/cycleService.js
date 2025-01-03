import { apiClient } from "./apiClient"

export const getCycles = async () => {
  const response = await apiClient.get("/cycles")
  return response.data
}

export const createCycle = async (cycle) => {
  const response = await apiClient.post("/cycles", cycle)
  return response.data
}

export const deleteCycle = async (cycleId) => {
  const response = await apiClient.delete(`/cycles/${cycleId}`)
  return response.data
}
