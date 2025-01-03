import { useState } from "react"
import { createGoal } from "../../services/goalService"
import { STATUS } from "../../constants/dashboard"

export default function CreateGoalModal({ hideModal, cycle, updateCycle }) {
  const [goal, setGoal] = useState({
    title: "",
    description: "",
    tactics: [],
    status: "todo",
    cycleId: cycle._id,
  })
  const [goalError, setGoalError] = useState("")

  const createNewGoal = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Unauthorized: No token found")
      }
      const data = await createGoal(goal)
      updateCycle({ ...cycle, goals: [...cycle.goals, data.goal] })
      setGoal({
        title: "",
        description: "",
        tactics: [],
        status: "todo",
        cycleId: cycle._id,
      })
      hideModal()
    } catch (err) {
      setGoalError(err)
    }
  }

  const addTactic = () => {
    const updatedGoal = {
      ...goal,
      tactics: [...goal.tactics, { title: "", description: "" }],
    }
    setGoal(updatedGoal)
  }

  return (
    <div className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5]'>
      <div className='bg-white z-10 p-10 rounded-lg w-1/2'>
        <form onSubmit={createNewGoal} className='flex flex-col gap-5'>
          <div>
            <input
              placeholder='Title'
              type='text'
              className='bg-neutral-100 rounded-lg p-2 w-full'
              value={goal.title}
              onChange={(e) => setGoal({ ...goal, title: e.target.value })}
              required
            />
          </div>
          <div>
            <textarea
              cols={20}
              placeholder='Description'
              className='bg-neutral-100 rounded-lg p-2 w-full'
              value={goal.description}
              onChange={(e) =>
                setGoal({ ...goal, description: e.target.value })
              }
            />
          </div>
          <div>
            <select
              value={goal.status}
              onChange={(e) => setGoal({ ...goal, status: e.target.value })}
            >
              {STATUS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          {goal.tactics.map((tactic, index) => (
            <div key={index}>
              <input
                placeholder='Tactic Title'
                type='text'
                className='bg-neutral-100 rounded-lg p-2 w-full'
                value={tactic.title}
                onChange={(e) => {
                  const newTactics = [...goal.tactics]
                  newTactics[index].title = e.target.value
                  setGoal({ ...goal, tactics: newTactics })
                }}
                required
              />
              <textarea
                cols={20}
                placeholder='Tactic Description'
                className='bg-neutral-100 rounded-lg p-2 w-full'
                value={tactic.description}
                onChange={(e) => {
                  const newTactics = [...goal.tactics]
                  newTactics[index].description = e.target.value
                  setGoal({ ...goal, tactics: newTactics })
                }}
              />
            </div>
          ))}
          <button className='w-fit font-bold' onClick={addTactic}>
            + Add Tactic
          </button>
          <div className='flex justify-between'>
            <button
              type='submit'
              className='mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:drop-shadow-lg transition-all text-white font-bold rounded-lg'
            >
              Save
            </button>
            <button
              onClick={hideModal}
              className='mt-5 px-4 py-2 bg-neutral-300 hover:bg-neutral-400 hover:drop-shadow-lg transition-all text-white font-bold rounded-lg'
            >
              Cancel
            </button>
            {goalError && <p style={{ color: "red" }}>{goalError}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}
