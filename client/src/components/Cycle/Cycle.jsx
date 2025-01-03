import { useState } from "react"
import CreateGoalModal from "../Goal/CreateGoalModal"

export default function Cycle({ cycle }) {
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
      <p className='text-neutral-400'>{cycle.description}</p>
      <div className='w-full grid grid-cols-3 gap-3'>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>Todo</h4>
          {cycle.goals
            .filter((goal) => goal.status === "todo")
            .map((goal) => (
              <div
                className='bg-neutral-300 rounded-lg p-2 my-2'
                key={goal._id}
              >
                <h4 className='font-bold'>{goal.title}</h4>
                <p>{goal.description}</p>
              </div>
            ))}
        </div>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>In Progress</h4>
          {cycle.goals
            .filter((goal) => goal.status === "in-progress")
            .map((goal) => (
              <div
                className='bg-neutral-300 rounded-lg p-2 my-2'
                key={goal._id}
              >
                <h4 className='font-bold'>{goal.title}</h4>
                <p>{goal.description}</p>
              </div>
            ))}
        </div>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>Completed</h4>
          {cycle.goals
            .filter((goal) => goal.status === "completed")
            .map((goal) => (
              <div
                className='bg-neutral-300 rounded-lg p-2 my-2'
                key={goal._id}
              >
                <h4 className='font-bold'>{goal.title}</h4>
                <p>{goal.description}</p>
              </div>
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
            cycleId={cycle._id}
            hideModal={() => setShowModal(false)}
          ></CreateGoalModal>
        )}
      </div>
    </div>
  )
}
