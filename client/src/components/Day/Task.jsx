import { useState } from "react"
import CreateTaskModal from "./CreateTaskModal"
import { Plus } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

export default function Task({ cycleId, task, deleteTask, goals, updateTask }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className='bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 text-neutral-100 text-sm rounded-lg p-2 my-2'
      key={task._id}
    >
      <h4 className='font-bold'>{task.title}</h4>
      <div className='flex justify-between'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              className='text-neutral-500 text-sm'
            >
              Edit
            </button>
          </DialogTrigger>
          <CreateTaskModal
            currentTask={task}
            goals={goals}
            cycleId={cycleId}
            updateTask={updateTask}
            hideModal={() => setOpen(false)}
          ></CreateTaskModal>
        </Dialog>
        <button
          onClick={() => deleteTask(task._id)}
          className='text-red-500 text-sm'
        >
          Delete
        </button>
      </div>
    </div>
  )
}
