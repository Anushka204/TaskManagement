import { useState, useEffect } from "react"

const getToken = () => localStorage.getItem("token")
const setToken = (token) => localStorage.setItem("token", token)
const removeToken = () => localStorage.removeItem("token")

const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])) // Decode JWT payload
    return payload
  } catch (err) {
    console.error("Invalid token", err)
    return null
  }
}

const isTokenExpired = (token) => {
  const payload = decodeToken(token)
  if (!payload || !payload.exp) return true
  return payload.exp * 1000 < Date.now()
}

const useAuthToken = () => {
  const [token, setAuthToken] = useState(getToken())
  const [isAuthenticated, setIsAuthenticated] = useState(!!token)

  useEffect(() => {
    if (token) {
      const expired = isTokenExpired(token)
      if (expired) {
        removeToken()
        setAuthToken(null)
        setIsAuthenticated(false)
      }
    }
  }, [token])

  const login = (newToken) => {
    setToken(newToken)
    setAuthToken(newToken)
    setIsAuthenticated(true)
  }

  const logout = () => {
    removeToken()
    setAuthToken(null)
    setIsAuthenticated(false)
  }

  const getDecodedToken = () => (token ? decodeToken(token) : null)

  return {
    token,
    isAuthenticated,
    login,
    logout,
    getDecodedToken,
  }
}

export default useAuthToken
