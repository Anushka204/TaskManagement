import { apiClient } from "./apiClient"

export const getUser = async () => {
  const response = await apiClient.get("/users")
  return response.data
}
