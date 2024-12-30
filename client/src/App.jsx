import "./App.css"
import { Link } from "react-router-dom"

function App() {
  const loginWithGoogle = async () => {
    window.location.href = `http://localhost:3000/auth/google`
  }

  return (
    <>
      <h1>Hello world</h1>
      <Link to='/home'>Home</Link>
      <br />

      <button onClick={loginWithGoogle} className='mt-4'>
        Login with google
      </button>
    </>
  )
}

export default App
