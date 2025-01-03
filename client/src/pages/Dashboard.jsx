import { useEffect, useState } from "react"
import axios from "axios"
import Cycle from "../components/Cycle/Cycle"
import Sidebar from "../components/Sidebar/Sidebar.jsx"
import Day from "../components/Day/Day.jsx"
import { VIEWS } from "../constants/dashboard.js"

const CycleView = () => {
  const [cycles, setCycles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          throw new Error("Unauthorized: No token found")
        }

        const response = await axios.get("http://localhost:3000/api/cycles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setCycles(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCycles()
  }, [])

  const [view, setView] = useState()
  const [data, setData] = useState({})

  const switchView = (value, d) => {
    setView(value)
    setData(d)
  }

  const renderView = () => {
    switch (view) {
      case VIEWS.CYCLE:
        return <Cycle cycle={data} setCycles={setCycles} />
      default:
        return <Day cycle={cycles[0]}></Day>
    }
  }

  if (loading) {
    return <div>Loading cycles...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Sidebar
      switchView={switchView}
      view={view}
      cycles={cycles}
      loading={loading}
      error={error}
      setCycles={setCycles}
    >
      {cycles.length > 0 ? (
        renderView()
      ) : (
        <div>No cycles found. Create one to get started!</div>
      )}
    </Sidebar>
  )
}

export default CycleView
