import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import {
  createCycle,
  deleteCycle as deleteCycleApi,
  getCycles,
  updateCycle as updateCycleApi,
} from "../services/cycleService"

const CycleContext = createContext()

export const useCycle = () => {
  const context = useContext(CycleContext)
  if (!context) {
    throw new Error("useCycle must be used within a CycleProvider")
  }
  return context
}

export const CycleProvider = ({ children }) => {
  const [cycles, setCycles] = useState([])
  const [currentCycle, setCurrentCycle] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchCycles = async () => {
    setLoading(true)
    try {
      const data = await getCycles()
      setCycles(data)
      setCurrentCycle(data[0])
    } catch (error) {
      console.error("Error fetching cycles:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateCycle = async (updates) => {
    try {
      const updatedCycle = await updateCycleApi(updates)

      setCycles((prevCycles) =>
        prevCycles.map((cycle) =>
          cycle._id === updatedCycle._id ? updatedCycle : cycle
        )
      )

      if (currentCycle && currentCycle._id === updates._id) {
        setCurrentCycle(updatedCycle)
      }
    } catch (error) {
      console.error("Error updating cycle:", error)
    }
  }

  const addCycle = async (newCycle) => {
    try {
      const data = await createCycle(newCycle)
      setCycles((prevCycles) => [...prevCycles, data])
    } catch (error) {
      console.error("Error adding cycle:", error)
    }
  }

  const deleteCycle = async (cycleId) => {
    try {
      await deleteCycleApi(cycleId)
      setCycles((prevCycles) =>
        prevCycles.filter((cycle) => cycle._id !== cycleId)
      )
      if (currentCycle && currentCycle._id === cycleId) {
        setCurrentCycle(null)
      }
    } catch (error) {
      console.error("Error deleting cycle:", error)
    }
  }

  useEffect(() => {
    fetchCycles()
  }, [])

  return (
    <CycleContext.Provider
      value={{
        cycles,
        currentCycle,
        setCurrentCycle,
        loading,
        addCycle,
        updateCycle,
        deleteCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
