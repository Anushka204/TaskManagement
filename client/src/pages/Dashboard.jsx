import { useEffect, useState } from "react"
import Cycle from "../components/Cycle/Cycle"
import Sidebar from "../components/Sidebar/Sidebar.jsx"
import Day from "../components/Day/Day.jsx"
import { VIEWS } from "../constants/dashboard.js"
import { getCycles, deleteCycle } from "../services/cycleService.js"
import { deleteGoal } from "../services/goalService.js"

const CycleView = () => {
  const [cycles, setCycles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const data = await getCycles()
        setCycles(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCycles()
  }, [])

  const [view, setView] = useState()
  const [data, setData] = useState({})

  const switchView = (value, d) => {
    setView(value)
    setData(d)
  }

  const removeCycle = async (cycle) => {
    try {
      await deleteCycle(cycle._id)
      const updatedCycles = cycles.filter((c) => c._id !== cycle._id)
      setCycles(updatedCycles)
      switchView(VIEWS.DAY)
    } catch (err) {
      setError(err.message)
    }
  }

  const updateCycle = async (updatedCycle) => {
    try {
      const updatedCycles = cycles.map((c) =>
        c._id === updatedCycle._id ? { ...updatedCycle } : { ...c }
      )
      setCycles(updatedCycles)
      setData(updatedCycle)
    } catch (err) {
      setError(err.message)
    }
  }

  const removeGoalAndUpdateCycle = async (goal) => {
    await deleteGoal(goal._id)
    const updatedCycle = { ...cycles.find((c) => c._id === goal.cycleId) }

    updateCycle({
      ...updatedCycle,
      goals: [...updatedCycle.goals.filter((g) => g._id !== goal._id)],
    })
  }

  const renderView = () => {
    switch (view) {
      case VIEWS.CYCLE:
        return (
          <Cycle
            deleteGoal={removeGoalAndUpdateCycle}
            cycle={data}
            deleteCycle={removeCycle}
            updateCycle={updateCycle}
          />
        )
      default:
        return <Day cycle={cycles[0]}></Day>
    }
  }

  if (loading) {
    return <div>Loading cycles...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Sidebar
      switchView={switchView}
      view={view}
      cycles={cycles}
      loading={loading}
      error={error}
      setCycles={setCycles}
    >
      {cycles.length > 0 ? (
        renderView()
      ) : (
        <div>No cycles found. Create one to get started!</div>
      )}
    </Sidebar>
  )
}

export default CycleView
