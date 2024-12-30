/* eslint-disable react/prop-types */
import { Suspense } from "react"
import useApp from "../hooks/useApp.jsx"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const { token } = useApp()

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {token ? children : <Navigate to={"/"} />}
    </Suspense>
  )
}

export default PrivateRoute
