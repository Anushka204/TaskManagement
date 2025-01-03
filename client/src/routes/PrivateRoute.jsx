/* eslint-disable react/prop-types */
import { Suspense } from "react"
import useApp from "../hooks/useAuthToken.jsx"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token")

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {token ? children : <Navigate to={"/"} />}
    </Suspense>
  )
}

export default PrivateRoute
