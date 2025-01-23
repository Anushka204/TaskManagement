import DailyExecutionTrend from "./DailyExecutionTrend"
import WeeklyExecutionTrend from "./WeeklyExecutionTrend"
import StatsBox from "./StatsBox"
import VisionBoard from "./VisionBoard"
import PendingTasks from "./PendingTasks"
import LogProgress from "./LogProgress"
import { useCycle } from "../../context/CycleContext"

function calculateWeeksBetween(startDate, endDate, includePartial = false) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const differenceInMs = Math.abs(end - start)
  const weeks = differenceInMs / (1000 * 60 * 60 * 24 * 7)

  return includePartial ? weeks : Math.floor(weeks)
}

const Overview = ({ setCurrentTab }) => {
  const { currentCycle } = useCycle()
  const { goals, startDate, endDate } = currentCycle

  const resolvedGoals = JSON.parse(JSON.stringify(goals))

  const completedGoals = resolvedGoals.filter(
    (goal) => goal.status === "completed"
  ).length

  const weeksPassed = calculateWeeksBetween(startDate, new Date())
  const totalWeeks = calculateWeeksBetween(endDate, startDate)

  const totalGoals = currentCycle?.goals.length
  return (
    <div className='w-full h-full grid grid-cols-12 gap-3 '>
      <div className='col-span-4 row-span-2'>
        <DailyExecutionTrend />
      </div>
      <div className='col-span-4 row-span-2'>
        <WeeklyExecutionTrend />
      </div>
      <div className='col-span-2'>
        <StatsBox
          value={`${weeksPassed}/${totalWeeks}`}
          label='Weeks Completed'
        />
      </div>
      <div className='col-span-2'>
        <StatsBox
          value={`${completedGoals}/${totalGoals}`}
          label='Goals Completed'
        />
      </div>
      <div className='col-span-4 row-start-2 col-start-9'>
        <LogProgress setCurrentTab={setCurrentTab} />
      </div>
      <div className='col-span-8 row-span-2 row-start-3'>
        <VisionBoard setCurrentTab={setCurrentTab} />
      </div>
      <div className='col-span-4 row-span-2 row-start-3'>
        <PendingTasks setCurrentTab={setCurrentTab} />
      </div>
    </div>
  )
}

export default Overview
