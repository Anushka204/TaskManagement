import { useState } from "react"
import CreateGoalModal from "../Goal/CreateGoalModal"
import Goal from "../Goal/Goal"
import { useCycle } from "../../context/CycleContext"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { deleteGoal as deleteGoalApi } from "../../services/goalService"
import { useToast } from "@/hooks/use-toast"

export default function Cycle() {
  const { currentCycle, deleteCycle, updateCycle } = useCycle()
  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const { goals } = currentCycle

  const todoGoals = goals.filter((goal) => goal.status === "todo")
  const inProgressGoals = goals.filter((goal) => goal.status === "in-progress")
  const completedGoals = goals.filter((goal) => goal.status === "completed")

  const deleteGoal = async (goalId) => {
    const response = await deleteGoalApi(goalId)
    const newCycle = {
      ...currentCycle,
      goals: currentCycle.goals.filter((goal) => goal._id !== goalId),
    }
    updateCycle(newCycle)
    toast({
      title: "Goal was successfully deleted!",
    })
    return response.data
  }

  return (
    <div className='bg-neutral-900 border border-neutral-800 rounded-lg p-6'>
      <div className='flex justify-between items-start'>
        <h2 className='text-xl text-lime-400 uppercase flex gap-3 items-center lexend-giga-700 mb-3'>
          {currentCycle.title}
          <span className='text-neutral-400 text-sm lexend-giga-400'>
            ({new Date(currentCycle.startDate).toLocaleDateString()}-
            {new Date(currentCycle.endDate).toLocaleDateString()})
          </span>
          <button className='text-neutral-100'>
            <Pencil size={15} />
          </button>
        </h2>
        <button
          onClick={() => deleteCycle(currentCycle._id)}
          className='text-red-500'
        >
          <Trash2 size={15} />
        </button>
      </div>
      <p className='text-neutral-400 text-xs mb-3'>
        {currentCycle.description}
      </p>
      <Separator />
      {currentCycle.goals.length > 0 ? (
        <div className='w-full grid grid-cols-3 gap-3 my-5'>
          <div className='w-full rounded-lg'>
            <h4 className='text-neutral-100 uppercase text-sm lexend-giga-700'>
              Todo
            </h4>
            {todoGoals.map((goal) => (
              <Goal
                key={goal._id}
                goal={goal}
                deleteGoal={deleteGoal}
                cycle={currentCycle}
                updateCycle={updateCycle}
              />
            ))}
          </div>
          <div className='w-full rounded-lg'>
            <h4 className='text-neutral-100 uppercase text-sm lexend-giga-700'>
              In Progress
            </h4>
            {inProgressGoals.map((goal) => (
              <Goal
                key={goal._id}
                goal={goal}
                deleteGoal={deleteGoal}
                cycle={currentCycle}
                updateCycle={updateCycle}
              />
            ))}
          </div>
          <div className='w-full rounded-lg'>
            <h4 className='text-neutral-100 uppercase text-sm lexend-giga-700'>
              Completed
            </h4>
            {completedGoals.map((goal) => (
              <Goal
                key={goal._id}
                goal={goal}
                deleteGoal={deleteGoal}
                cycle={currentCycle}
                updateCycle={updateCycle}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='p-10 flex flex-col gap-3 items-center justify-center bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 w-full h-56 my-5'>
          <h3 className='text-sm text-neutral-200 lexend-giga-700 uppercase'>
            No goals added yet...
          </h3>
          <span className='text-xs text-center text-neutral-500'>
            Start adding goals using the button below. Define 1–3 specific,
            measurable goals to focus on for the next 12 weeks. These should
            align with your vision
          </span>
        </div>
      )}
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              className='flex items-center gap-2 text-sm mt-5 px-4 py-2 text-neutral-900 bg-lime-400 hover:drop-shadow-lg transition-all font-bold rounded-md lexend-giga-700 uppercase'
            >
              <Plus />
              <span>Create New Goal</span>
            </button>
          </DialogTrigger>
          <CreateGoalModal
            cycle={currentCycle}
            updateCycle={updateCycle}
            setOpen={setOpen}
          ></CreateGoalModal>
        </Dialog>
      </div>
    </div>
  )
}
