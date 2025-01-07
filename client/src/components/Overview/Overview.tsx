import Header from "./Header"
import DailyExecutionTrend from "./DailyExecutionTrend"
import WeeklyExecutionTrend from "./WeeklyExecutionTrend"
import StatsBox from "./StatsBox"
import VisionBoard from "./VisionBoard"
import PendingTasks from "./PendingTasks"

const Overview = ({ cycle }) => {
  return (
    <div className='w-full'>
      <Header />
      <div className='p-6 h-[80vh] grid grid-cols-12 gap-4'>
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
          <StatsBox value='1/12' label='Goals Completed' />
        </div>
        <div className='col-span-4 row-start-2 col-start-9'>
          <StatsBox value='1/12' label='Goals Completed' />
        </div>
        <div className='col-span-8 row-span-2 row-start-3'>
          <VisionBoard cycle={cycle} />
        </div>
        <div className='col-span-4 row-span-1 row-start-3'>
          <PendingTasks />
        </div>
        <div className='col-span-4 row-span-1 row-start-4'>
          <PendingTasks />
        </div>
      </div>
    </div>
  )
}

export default Overview
