import DailyExecutionTrend from "./DailyExecutionTrend"
import WeeklyExecutionTrend from "./WeeklyExecutionTrend"
import StatsBox from "./StatsBox"
import VisionBoard from "./VisionBoard"
import PendingTasks from "./PendingTasks"
import LogProgress from "./LogProgress"
import { useCycle } from "../../context/CycleContext"

const Overview = ({ setCurrentTab }) => {
  const { currentCycle } = useCycle()

  const completedGoals = currentCycle?.goals.filter(
    (goal) => goal.status === "completed"
  ).length

  const totalGoals = currentCycle?.goals.length
  return (
    <div className='w-full'>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-4 row-span-2'>
          <DailyExecutionTrend />
        </div>
        <div className='col-span-4 row-span-2'>
          <WeeklyExecutionTrend />
        </div>
        <div className='col-span-2'>
          <StatsBox value='1/12' label='Weeks Completed' />
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
          <PendingTasks />
        </div>
      </div>
    </div>
  )
}

export default Overview
