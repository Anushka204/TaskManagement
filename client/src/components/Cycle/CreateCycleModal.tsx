import { useState } from "react"
import useAuthToken from "../../hooks/useAuthToken"
import { useNavigate } from "react-router-dom"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCycle } from "../../context/CycleContext"
import { useToast } from "../../hooks/use-toast"

type Props = {}

const CreateCycleModal: React.FC<Props> = ({ setOpen }) => {
  const [newCycle, setNewCycle] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    visionBoardImage: "",
  })

  const [error, setError] = useState(null)
  const { token, logout } = useAuthToken()
  const { addCycle } = useCycle()

  const navigate = useNavigate()
  const { toast } = useToast()

  const handleCreateCycle = async (e: MouseEvent) => {
    e.preventDefault()
    try {
      if (!token) {
        logout()
        navigate("/")
      }

      await addCycle(newCycle)

      toast({
        title: "Successfully created a new cycle!",
      })

      setNewCycle({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        visionBoardImage: "",
      })
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create cycle")
    } finally {
      setOpen(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Cycle</DialogTitle>
        <DialogDescription>
          <div>
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
              <div>
                <input
                  placeholder='Vision Board Image URL'
                  className='bg-neutral-100 rounded-lg p-2 w-full'
                  type='text'
                  value={newCycle.visionBoardImage}
                  onChange={(e) =>
                    setNewCycle({
                      ...newCycle,
                      visionBoardImage: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:drop-shadow-lg transition-all text-white font-bold rounded-lg'
                >
                  Save
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
            </form>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}

export default CreateCycleModal
