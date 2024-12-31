import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Success = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Extract the token from the URL
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")

    if (token) {
      // Store the token in localStorage or other state management
      localStorage.setItem("token", token)
      // Redirect to the Cycle View page after storing the token
      navigate("/cycle")
    } else {
      // Redirect to login if the token is not found
      navigate("/login")
    }
  }, [navigate])

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  )
}

export default Success
