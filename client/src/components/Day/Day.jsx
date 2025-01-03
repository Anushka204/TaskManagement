import { useState, useEffect } from "react"
import axios from "axios"
import CreateTaskModal from "./CreateTaskModal"

export default function Day({ cycle }) {
  const [tasks, setTasks] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("Unauthorized: No token found")
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        setTasks(response.data.tasks)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTasks()
  }, [])

  return (
    <div className='bg-neutral-200 rounded-lg p-4'>
      <h2 className='text-xl uppercase flex items-center'>Today</h2>
      <div className='w-full grid grid-cols-3 gap-3'>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>Todo</h4>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <div
                className='bg-neutral-300 rounded-lg p-2 my-2'
                key={task._id}
              >
                <h4 className='font-bold'>{task.title}</h4>
                <p>{task.description}</p>
              </div>
            ))}
        </div>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>In Progress</h4>
          {tasks
            .filter((task) => task.status === "in-progress")
            .map((task) => (
              <div
                className='bg-neutral-300 rounded-lg p-2 my-2'
                key={task._id}
              >
                <h4 className='font-bold'>{task.title}</h4>
                <p>{task.description}</p>
              </div>
            ))}
        </div>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>Completed</h4>
          {tasks
            .filter((task) => task.status === "completed")
            .map((task) => (
              <div
                className='bg-neutral-300 rounded-lg p-2 my-2'
                key={task._id}
              >
                <h4 className='font-bold'>{task.title}</h4>
                <p>{task.description}</p>
              </div>
            ))}
        </div>
      </div>
      <div>
        <button
          onClick={() => setShowModal(true)}
          className='mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:drop-shadow-lg transition-all text-white font-bold rounded-lg'
        >
          Create New Task
        </button>
        {showModal && (
          <CreateTaskModal
            cycleId={cycle._id}
            goals={cycle.goals}
            hideModal={() => setShowModal(false)}
          ></CreateTaskModal>
        )}
      </div>
    </div>
  )
}
