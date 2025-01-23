import { createContext, useContext, useReducer, useEffect } from "react"
import {
  createCycle,
  deleteCycle as deleteCycleApi,
  getCycles,
  updateCycle as updateCycleApi,
} from "../services/cycleService"
import { ACTIONS, cycleReducer, initialState } from "../reducers/cycleReducer"

const CycleContext = createContext()

export const useCycle = () => {
  const context = useContext(CycleContext)
  if (!context) {
    throw new Error("useCycle must be used within a CycleProvider")
  }
  return context
}

export const CycleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cycleReducer, initialState)

  const fetchCycles = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    try {
      const data = await getCycles()
      dispatch({ type: ACTIONS.SET_CYCLES, payload: JSON.parse(JSON.stringify(data)) })
    } catch (error) {
      console.error("Error fetching cycles:", error)
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message })
    }
    dispatch({ type: ACTIONS.SET_LOADING, payload: false })
  }

  const addCycle = async (newCycle) => {
    try {
      const data = await createCycle(newCycle)
      dispatch({ type: ACTIONS.ADD_CYCLE, payload: data })
    } catch (error) {
      console.error("Error adding cycle:", error)
    }
  }

  const updateCycle = async (updates) => {
    try {
      const updatedCycle = await updateCycleApi(updates)
      dispatch({ type: ACTIONS.UPDATE_CYCLE, payload: updatedCycle })
    } catch (error) {
      console.error("Error updating cycle:", error)
    }
  }

  const deleteCycle = async (cycleId) => {
    try {
      await deleteCycleApi(cycleId)
      dispatch({ type: ACTIONS.DELETE_CYCLE, payload: cycleId })
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
        cycles: state.cycles,
        currentCycle: state.currentCycle,
        setCurrentCycle: (cycle) =>
          dispatch({ type: ACTIONS.SET_CURRENT_CYCLE, payload: cycle }),
        loading: state.loading,
        addCycle,
        updateCycle,
        deleteCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
