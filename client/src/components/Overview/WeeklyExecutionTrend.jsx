import { useEffect, useState } from "react"
import { useCycle } from "../../context/CycleContext"
import { Separator } from "@/components/ui/separator"
import { getWeeklyTrend } from "../../services/dailyScoreService"

const WeeklyExecutionTrend = () => {
  const { currentCycle } = useCycle()

  useEffect(() => {
    if (currentCycle) {
      const fetchTrend = async (cycleId) => {
        const data = await getWeeklyTrend(cycleId)
      }
      fetchTrend(currentCycle._id)
    }
  }, [currentCycle])

  const data = [10, 30, 50, 70, 40, 80, 60, 30, 5, 10, 20, 30]

  return (
    <div className='p-6 bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 rounded-lg h-full w-full flex flex-col gap-2'>
      <h2 className='text-sm text-neutral-100 uppercase font-bold lexend-giga-700'>
        Weekly Execution Trend
      </h2>
      <span className='text-xs text-neutral-400'>
        A summary of how you've spent the past weeks of this cycle
      </span>
      <Separator />
      <div
        className='grid grid-cols-12 h-[70%] justify-between gap-1 mt-3 p-2 rounded-md'
        style={{
          backgroundImage: "radial-gradient(#262626, #171717)",
        }}
      >
        {data.map((value, index) => (
          <div className='h-full text-center self-end' key={index}>
            <div
              style={{ height: `${value}%` }}
              className='bg-gradient-to-b from-yellow-400 via-green-400 to-indigo-500 rounded-sm'
            ></div>
            <span
              className='text-neutral-100 text-xs text-center lexend-giga-400'
              key={index}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeeklyExecutionTrend
