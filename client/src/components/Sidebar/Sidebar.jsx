import { useState } from "react"
import CreateCycleModal from "../Cycle/CreateCycleModal"

export const VIEWS = {
  CYCLE: "cycle",
  DAY: "DAY",
  WEEK: "WEEK",
}

export default function Sidebar({
  children,
  switchView,
  loading,
  error,
  cycles,
  setCycles,
}) {
  const [showModal, setShowModal] = useState(false)

  if (loading) {
    return <div>Loading cycles...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='grid grid-cols-[1fr,4fr] w-screen min-h-screen'>
      <div className='h-full bg-neutral-900 text-neutral-100 z-10 p-5'>
        <h1 className='font-bold text-2xl mb-10'>Your Cycles</h1>
        {cycles.length > 0 ? (
          <ul className='flex flex-col gap-3'>
            {cycles.map((cycle) => (
              <div
                onClick={() => switchView(VIEWS.CYCLE, cycle)}
                key={cycle._id}
                className='cursor-pointer bg-neutral-800 p-2 rounded-lg'
              >
                <span>{cycle.title}</span>
              </div>
            ))}
          </ul>
        ) : (
          <>
            <p>No cycles found. Create one to get started!</p>
          </>
        )}
        <button
          onClick={() => setShowModal(true)}
          className='mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:drop-shadow-lg transition-all text-white font-bold rounded-lg'
        >
          Create New Cycle
        </button>
        {showModal && (
          <CreateCycleModal
            setCycles={setCycles}
            hideModal={() => setShowModal(false)}
          ></CreateCycleModal>
        )}
        <button className='mt-10 text-xs' onClick={() => switchView(VIEWS.DAY, cycles[0])}>
          Switch to daily view
        </button>
      </div>
      <div>{children}</div>
    </div>
  )
}
