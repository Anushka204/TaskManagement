import { useState } from "react"
import { createGoal, updateGoal } from "../../services/goalService"
import { STATUS } from "../../constants/dashboard"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogFooter } from "../ui/dialog"
import { useToast } from "../../hooks/use-toast"

export default function CreateGoalModal({
  cycle,
  updateCycle,
  currentGoal,
  setOpen,
}) {
  const [goal, setGoal] = useState(
    currentGoal || {
      title: "",
      description: "",
      tactics: [],
      status: "todo",
      cycleId: cycle._id,
    }
  )
  const [goalError, setGoalError] = useState("")

  const { toast } = useToast()

  const updateCurrentGoal = async (e) => {
    e.preventDefault()
    try {
      const data = await updateGoal(goal)
      toast({
        title: "Successfully created a new goal!",
      })
      updateCycle({
        ...cycle,
        goals: cycle.goals.map((g) => {
          if (g._id === data.goal._id) {
            return data.goal
          }
          return g
        }),
      })
      setGoal({
        title: "",
        description: "",
        tactics: [],
        status: "todo",
        cycleId: cycle._id,
      })
      toast({
        title: "Goal was successfully updated!",
      })
    } catch (err) {
      setGoalError(err)
    } finally {
      setOpen(false)
    }
  }

  const createNewGoal = async (e) => {
    e.preventDefault()
    try {
      const data = await createGoal(goal)
      updateCycle({ ...cycle, goals: [...cycle.goals, data.goal] })
      setGoal({
        title: "",
        description: "",
        tactics: [],
        status: "todo",
        cycleId: cycle._id,
      })
    } catch (err) {
      setGoalError(err)
      toast({
        title: "Goal was successfully created!",
      })

    } finally {
      setOpen(false)
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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add new goal</DialogTitle>
      </DialogHeader>
      <div className='bp-10 rounded-lg w-full'>
        <form
          onSubmit={currentGoal ? updateCurrentGoal : createNewGoal}
          className='flex flex-col gap-5'
        >
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
          <DialogFooter>
            <div className='flex justify-between'>
              <button
                type='submit'
                className='mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:drop-shadow-lg transition-all text-white font-bold rounded-lg'
              >
                Save
              </button>
              {goalError && <p style={{ color: "red" }}>{goalError}</p>}
            </div>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  )
}
