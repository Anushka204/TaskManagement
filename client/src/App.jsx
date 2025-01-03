import "./App.css"
import { useNavigate } from "react-router-dom"
import useAuthToken from "./hooks/useAuthToken"

function App() {
  const { isAuthenticated } = useAuthToken()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate("/cycle")
  }

  const loginWithGoogle = async () => {
    window.location.href = `http://localhost:3000/auth/google`
  }

  return (
    <div className='bg-neutral-100 w-screen h-screen flex justify-center items-center'>
      <button
        onClick={loginWithGoogle}
        className='px-5 py-3 bg-blue-500 hover:bg-blue-600 hover:drop-shadow-lg transition-all text-white font-bold rounded-lg'
      >
        Login with google
      </button>
    </div>
  )
}

export default App
