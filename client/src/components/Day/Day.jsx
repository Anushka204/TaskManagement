import { useState, useEffect } from "react"
import axios from "axios"
import CreateTaskModal from "./CreateTaskModal"
import Task from "./Task"
import { getTasks, deleteTask } from "../../services/taskService"

export default function Day({ cycle }) {
  const [tasks, setTasks] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [dueDate, setDueDate] = useState(new Date())

  useEffect(() => {
    const fetchTasks = async () => {
      const date = dueDate.toISOString().split("T")[0]
      try {
        const data = await getTasks(date)
        setTasks(data.tasks)
      } catch (error) {
        console.error(error)
      }
    }

    fetchTasks()
  }, [dueDate])

  const addTask = (newTask) => {
    if (
      dueDate.toISOString().split("T")[0] ===
      new Date(newTask.dueDate).toISOString().split("T")[0]
    ) {
      setTasks([...tasks, newTask])
    }
  }

  const removeTask = async (taskId) => {
    await deleteTask(taskId)
    setTasks(tasks.filter((task) => task._id !== taskId))
  }

  const updateTasks = (task) => {
    setTasks(tasks.map((t) => (t._id === task._id ? task : t)))
  }

  if (cycle.goals.length === 0) {
    return (
      <div className='bg-neutral-200 rounded-lg p-4'>
        <h2 className='text-xl uppercase flex items-center'>Today</h2>
        <p className='text-neutral-400'>
          No goals found. Please create a goal to get started.
        </p>
      </div>
    )
  }

  return (
    <div className='bg-neutral-200 rounded-lg p-4'>
      <h2 className='text-xl uppercase flex items-center'>
        Today{" "}
        <span className='text-neutral-400 text-sm ml-3'>
          {dueDate.toLocaleDateString()}
        </span>
      </h2>
      <div>
        <label>Change Date:</label>
        <input
          className='bg-neutral-100 rounded-lg p-2 w-full'
          type='date'
          value={new Date(dueDate).toISOString().split("T")[0]}
          onChange={(e) => setDueDate(new Date(e.target.value))}
          required
        />
      </div>
      <div className='w-full grid grid-cols-3 gap-3'>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>Todo</h4>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <Task
                task={task}
                key={task._id}
                cycleId={cycle._id}
                deleteTask={removeTask}
                updateTasks={updateTasks}
                goals={cycle.goals}
              />
            ))}
        </div>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>In Progress</h4>
          {tasks
            .filter((task) => task.status === "in-progress")
            .map((task) => (
              <Task
                task={task}
                key={task._id}
                cycleId={cycle._id}
                deleteTask={removeTask}
                updateTasks={updateTasks}
                goals={cycle.goals}
              />
            ))}
        </div>
        <div className='w-full rounded-lg'>
          <h4 className='font-bold'>Completed</h4>
          {tasks
            .filter((task) => task.status === "completed")
            .map((task) => (
              <Task
                task={task}
                key={task._id}
                cycleId={cycle._id}
                deleteTask={removeTask}
                updateTasks={updateTasks}
                goals={cycle.goals}
              />
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
            addTask={addTask}
          ></CreateTaskModal>
        )}
      </div>
    </div>
  )
}
