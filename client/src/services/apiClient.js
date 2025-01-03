import axios from "axios"

const token = localStorage.getItem("token") || null

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
})

apiClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    let res = error.response
    console.error(`Looks like there was a problem. Status Code: ${res.status}`)
    return Promise.reject(error)
  }
)
