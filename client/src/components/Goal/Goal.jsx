import { useState } from "react"
import CreateGoalModal from "./CreateGoalModal"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

export default function Goal({ goal, deleteGoal, cycle, updateCycle }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className='bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 text-neutral-100 text-sm rounded-lg p-4 my-3'
      key={goal._id}
    >
      <h4 className='font-bold mb-3'>{goal.title}</h4>
      <p>{goal.description}</p>
      <div className='flex justify-between'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              className='text-neutral-500 text-xs'
            >
              Edit
            </button>
          </DialogTrigger>
          <CreateGoalModal
            cycle={cycle}
            currentGoal={goal}
            updateCycle={updateCycle}
            setOpen={setOpen}
          ></CreateGoalModal>
        </Dialog>
        <button
          onClick={() => deleteGoal(goal._id)}
          className='text-red-500 text-xs'
        >
          Delete
        </button>
      </div>
    </div>
  )
}
