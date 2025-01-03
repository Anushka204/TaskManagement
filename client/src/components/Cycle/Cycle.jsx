import { useState } from "react"
import CreateGoalModal from "../Goal/CreateGoalModal"
import Goal from "../Goal/Goal"

export default function Cycle({ cycle, deleteCycle, updateCycle, deleteGoal }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='bg-neutral-200 rounded-lg p-4'>
      <h2 className='text-xl uppercase flex items-center'>
        {cycle.title}
        <span className='text-neutral-400 text-sm ml-3'>
          ({new Date(cycle.startDate).toLocaleDateString()}-
          {new Date(cycle.endDate).toLocaleDateString()})
        </span>
      </h2>
      <button
        onClick={() => deleteCycle(cycle)}
        className='bg-red-500 hover:bg-red-600 p-2 rounded-md text-white font-bold text-sm'
      >
        Delete
      </button>
      <p className='text-neutral-400'>{cycle.description}</p>
      <div className='w-full grid grid-cols-3 gap-3'>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>Todo</h4>
          {cycle.goals
            .filter((goal) => goal.status === "todo")
            .map((goal) => (
              <Goal
                key={goal._id}
                goal={goal}
                deleteGoal={deleteGoal}
                cycle={cycle}
                updateCycle={updateCycle}
              />
            ))}
        </div>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>In Progress</h4>
          {cycle.goals
            .filter((goal) => goal.status === "in-progress")
            .map((goal) => (
              <Goal
                key={goal._id}
                goal={goal}
                deleteGoal={deleteGoal}
                cycle={cycle}
                updateCycle={updateCycle}
              />
            ))}
        </div>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>Completed</h4>
          {cycle.goals
            .filter((goal) => goal.status === "completed")
            .map((goal) => (
              <Goal
                key={goal._id}
                goal={goal}
                deleteGoal={deleteGoal}
                cycle={cycle}
                updateCycle={updateCycle}
              />
            ))}
        </div>
      </div>
      <div>
        <button
          onClick={() => setShowModal(true)}
          className='mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:drop-shadow-lg transition-all text-white font-bold rounded-lg'
        >
          Create New Goal
        </button>
        {showModal && (
          <CreateGoalModal
            cycle={cycle}
            updateCycle={updateCycle}
            hideModal={() => setShowModal(false)}
          ></CreateGoalModal>
        )}
      </div>
    </div>
  )
}
