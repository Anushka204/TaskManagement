import { useState } from "react"
import axios from "axios"
import useAuthToken from "../../hooks/useAuthToken"
import { useNavigate } from "react-router-dom"
import { VIEWS } from '../../constants/dashboard'
import { createCycle } from '../../services/cycleService'

export default function CreateCycleModal({ hideModal, setCycles, cycles, switchCycleView }) {
  const [newCycle, setNewCycle] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  })

  const [error, setError] = useState(null)
  const { token, logout } = useAuthToken()

  const navigate = useNavigate()

  const handleCreateCycle = async (e) => {
    e.preventDefault()
    try {
      if (!token) {
        logout()
        navigate("/")
      }

      const data = await createCycle(newCycle)

      setCycles([...cycles, data])
      setNewCycle({ title: "", description: "", startDate: "", endDate: "" })
      switchCycleView(VIEWS.CYCLE, data)
      hideModal()
      alert("Cycle created successfully!")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create cycle")
    }
  }

  return (
    <div className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5]'>
      <div className='bg-white z-10 p-10 rounded-lg w-1/2'>
        <form
          onSubmit={handleCreateCycle}
          className='flex flex-col gap-5 text-neutral-900'
        >
          <div>
            <input
              placeholder='Title'
              className='bg-neutral-100 rounded-lg p-2 w-full'
              type='text'
              value={newCycle.title}
              onChange={(e) =>
                setNewCycle({ ...newCycle, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <textarea
              className='bg-neutral-100 rounded-lg p-2 w-full'
              placeholder='Description (Optional)'
              value={newCycle.description}
              onChange={(e) =>
                setNewCycle({ ...newCycle, description: e.target.value })
              }
            />
          </div>
          <div>
            <label>From:</label>
            <input
              className='bg-neutral-100 rounded-lg p-2 w-full'
              type='date'
              value={newCycle.startDate}
              onChange={(e) =>
                setNewCycle({ ...newCycle, startDate: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>To:</label>
            <input
              className='bg-neutral-100 rounded-lg p-2 w-full'
              type='date'
              value={newCycle.endDate}
              onChange={(e) =>
                setNewCycle({ ...newCycle, endDate: e.target.value })
              }
              required
            />
          </div>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}
