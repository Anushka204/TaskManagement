import { useEffect, useState } from "react"
import axios from "axios"
import Cycle from "./components/Cycle/Cycle"

const CycleView = () => {
  const [cycles, setCycles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newCycle, setNewCycle] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
          throw new Error("Unauthorized: No token found")
        }

        // Replace with your backend API URL
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

  const handleCreateCycle = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("Unauthorized: No token found")
      }

      // Send the new cycle data to the backend
      const response = await axios.post(
        "http://localhost:3000/api/cycles",
        newCycle,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      // Add the new cycle to the state
      setCycles((prevCycles) => [...prevCycles, response.data.cycle])
      setNewCycle({ title: "", description: "", startDate: "", endDate: "" })
      alert("Cycle created successfully!")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create cycle")
    }
  }

  if (loading) {
    return <div>Loading cycles...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Your Cycles</h1>
      {cycles.length > 0 ? (
        <ul>
          {cycles.map((cycle) => (
            <Cycle cycle={cycle} key={cycle._id} />
          ))}
        </ul>
      ) : (
        <>
          <p>No cycles found. Create one to get started!</p>
        </>
      )}
      <h2>Create New Cycle</h2>
      <form onSubmit={handleCreateCycle} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Title:</label>
          <input
            type='text'
            value={newCycle.title}
            onChange={(e) =>
              setNewCycle({ ...newCycle, title: e.target.value })
            }
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <input
            type='text'
            value={newCycle.description}
            onChange={(e) =>
              setNewCycle({ ...newCycle, description: e.target.value })
            }
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Start Date:</label>
          <input
            type='date'
            value={newCycle.startDate}
            onChange={(e) =>
              setNewCycle({ ...newCycle, startDate: e.target.value })
            }
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>End Date:</label>
          <input
            type='date'
            value={newCycle.endDate}
            onChange={(e) =>
              setNewCycle({ ...newCycle, endDate: e.target.value })
            }
            required
          />
        </div>
        <button type='submit'>Create Cycle</button>
      </form>
    </div>
  )
}

export default CycleView
