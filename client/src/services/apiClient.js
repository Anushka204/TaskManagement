import axios from "axios"

const token = localStorage.getItem("token") || null

export const axiosClient = axios.create({
  baseURL: "http://localhost:3000/auth",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
})

axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    let res = error.response
    console.error(`Looks like there was a problem. Status Code: ${res.status}`)
    return Promise.reject(error)
  }
)
