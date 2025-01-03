import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthToken from "../hooks/useAuthToken"

const Success = () => {
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get("token")

  const { login } = useAuthToken()

  useEffect(() => {
    if (token) {
      login(token)
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
  }, [token])

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  )
}

export default Success
