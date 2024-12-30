/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"

export const AppContext = createContext(null)

export default function AppContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null)

  const logout = () => {
    setToken(null)
    localStorage.removeItem("token")
  }

  useEffect(() => {
    if (token) localStorage.setItem("token", token)
  }, [token])

  return (
    <AppContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AppContext.Provider>
  )
}
