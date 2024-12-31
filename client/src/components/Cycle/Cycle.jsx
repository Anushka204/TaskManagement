import { useState } from "react"
import Goal from "../Goal/Goal"

export default function Cycle({ cycle }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [goalError, setGoalError] = useState("")

  const createGoal = async (e) => {
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

  return (
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
            <Goal key={goal._id} goal={goal}></Goal>
          ))}
        </ul>
      </div>
      <div>
        <h2>Create New Goal</h2>
        <form onSubmit={createGoal}>
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
          {goalError && <p style={{ color: "red" }}>{goalError}</p>}
        </form>
      </div>
    </li>
  )
}
