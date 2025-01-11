import { useState } from "react"
import CreateGoalModal from "./CreateGoalModal"

export default function Goal({ goal, deleteGoal, cycle, updateCycle }) {
  const [open, setOpen] = useState(false)

  return (
    <div className='bg-neutral-300 rounded-lg p-2 my-2' key={goal._id}>
      <h4 className='font-bold'>{goal.title}</h4>
      <p>{goal.description}</p>
      <div className='flex justify-between'>
        <button
          onClick={() => setShowModal(true)}
          className='text-neutral-500 text-sm'
        >
          Edit
        </button>
        <button
          onClick={() => deleteGoal(goal)}
          className='text-red-500 text-sm'
        >
          Delete
        </button>
      </div>
      {showModal && (
        <CreateGoalModal
          currentGoal={goal}
          cycle={cycle}
          updateCycle={updateCycle}
          hideModal={() => setShowModal(false)}
        ></CreateGoalModal>
      )}
    </div>
  )
}
