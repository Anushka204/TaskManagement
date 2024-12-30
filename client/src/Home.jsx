import { useEffect, useState } from "react"
import useApp from "./hooks/useApp"
import { axiosClient } from "./services/apiClient"

const Home = () => {
  const { token, logout } = useApp()
  const [user, setUser] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await axiosClient.get("/isAuthenticated")

        setUser(data.user)
      } catch (err) {
        console.log(err.response)
      }
    })()
  }, [token])

  return (
    <div className='p-4'>
      <h1 className='text-2xl'>{user?.username}</h1>
      <p className='text-zinc-500'>This is a protected page.</p>
      <button onClick={logout} className='mt-4'>
        Logout
      </button>
    </div>
  )
}

export default Home
