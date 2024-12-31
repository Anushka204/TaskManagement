import { useEffect, useState } from "react"
import axios from "axios"

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

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [goalError, setGoalError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Unauthorized: No token found")
      }

      const response = await axios.post(
        "http://localhost:3000/api/goals",
        { title, description, cycleId: cycles[0]._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      setTitle("")
      setDescription("")
      alert("Goal created successfully!")
    } catch (err) {
      setGoalError(err.response?.data?.message || "Failed to create goal")
    }
  }

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
            <li key={cycle._id}>
              <h2>{cycle.title}</h2>
              <p>{cycle.description}</p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(cycle.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(cycle.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Goals:</strong> {cycle.goals.length}
              </p>
              <div>
                <h2>Goals</h2>
                <ul>
                  {cycle.goals.map((goal) => (
                    <li key={goal._id}>
                      <h3>{goal.title}</h3>
                      <p>{goal.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2>Create New Goal</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Title:</label>
                    <input
                      type='text'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <input
                      type='text'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <button type='submit'>Create Goal</button>
                  {error && <p style={{ color: "red" }}>{goalError}</p>}
                </form>
              </div>
            </li>
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
