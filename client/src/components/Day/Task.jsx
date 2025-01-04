import { useState } from "react"
import CreateTaskModal from "./CreateTaskModal"

export default function Task({ cycleId, task, deleteTask, goals, updateTasks }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='bg-neutral-300 rounded-lg p-2 my-2' key={task._id}>
      <h4 className='font-bold'>{task.title}</h4>
      <div className='flex justify-between'>
        <button
          onClick={() => setShowModal(true)}
          className='text-neutral-500 text-sm'
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className='text-red-500 text-sm'
        >
          Delete
        </button>
      </div>
      {showModal && (
        <CreateTaskModal
          currentTask={task}
          goals={goals}
          cycleId={cycleId}
          updateTasks={updateTasks}
          hideModal={() => setShowModal(false)}
        ></CreateTaskModal>
      )}
    </div>
  )
}
