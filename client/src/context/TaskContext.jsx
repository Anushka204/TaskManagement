import { createContext, useReducer, useContext, useEffect } from "react"
import { getTasks, deleteTask } from "@/services/taskService"
import { getDailyScore } from "@/services/dailyScoreService"
import taskReducer, { initialState } from "@/reducers/tasksReducer"
import {
  createTask as createTaskApi,
  updateTask as updateTaskApi,
} from "@/services/taskService"

const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const date = state.dueDate.toISOString().split("T")[0]
        const data = await getTasks(date)
        dispatch({ type: "SET_TASKS", payload: data.tasks })
      } catch (error) {
        console.error("Error fetching tasks:", error)
      }
    }

    fetchTasks()
  }, [state.dueDate])

  useEffect(() => {
    const fetchDailyScore = async () => {
      try {
        const date = state.dueDate.toISOString().split("T")[0]
        const data = await getDailyScore(date)
        dispatch({ type: "SET_DAILY_SCORE", payload: data.executionScore })
      } catch (error) {
        console.error("Error fetching daily score:", error)
      }
    }

    fetchDailyScore()
  }, [state.tasks, state.dueDate])

  const addTask = async (newTask) => {
    const data = await createTaskApi(newTask)
    dispatch({ type: "ADD_TASK", payload: data.task })
  }

  const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId)
      dispatch({ type: "REMOVE_TASK", payload: taskId })
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const updateTask = async (updatedTask) => {
    const data = await updateTaskApi(updatedTask)
    dispatch({ type: "UPDATE_TASK", payload: data.task })
  }

  const setDueDate = (date) => {
    dispatch({ type: "SET_DUE_DATE", payload: date })
  }

  return (
    <TaskContext.Provider
      value={{
        ...state,
        addTask,
        removeTask,
        updateTask,
        setDueDate,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
