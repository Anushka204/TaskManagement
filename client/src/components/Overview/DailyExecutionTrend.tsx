import { useEffect, useState } from "react"
import { useCycle } from "../../context/CycleContext"
import { getDailyTrend } from "../../services/dailyScoreService"
import Heatmap from "../ui/charts/Heatmap"
import { Separator } from "../ui/separator"

const colors = [
  "bg-blue-50",
  "bg-blue-100",
  "bg-blue-200",
  "bg-blue-300",
  "bg-blue-400",
  "bg-blue-500",
  "bg-blue-600",
  "bg-blue-700",
  "bg-blue-800",
  "bg-blue-900",
  "bg-blue-950",
]

const mapScoreToColor = (score) => {
  const level = Math.ceil(score / 10)
  return colors[level]
}

const DailyExecutionTrend = () => {
  const { currentCycle } = useCycle()
  const [data, setData] = useState([])

  const heatMapdata = []
  for (let i = 0; i < 12 * 7; i++) {
    const depth = Math.floor(Math.random() * 20 + 3)
    heatMapdata.push({
      score: i,
      color: "bg-neutral-700",
    })
  }

  useEffect(() => {
    if (currentCycle) {
      const fetchTrend = async (cycleId) => {
        const res = await getDailyTrend(cycleId)
        const d = [...heatMapdata]
        for (let i = 0; i < res.length; i++) {
          const score = res[i].executionScore
          const color = mapScoreToColor(score)
          d[i] = { ...d[i], score, color }
        }
        setData(d)
      }
      fetchTrend(currentCycle._id)
    }
  }, [currentCycle])

  return (
    <div className='p-6 bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-lg h-full w-full flex flex-col gap-2'>
      <h2 className='text-sm text-neutral-100 font-bold mb-2 uppercase lexend-giga-700'>
        Daily Execution Trend
      </h2>
      <span className='text-xs text-neutral-400'>
        A summary of how you've spent the every day of this cycle
      </span>
      <Separator />
      <div
        className='w-full h-full grid grid-cols-12 gap-1 p-4 mt-3'
        style={{
          backgroundImage: "radial-gradient(#262626, #171717)",
        }}
      >
        {data.map((d, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full ${d.color} drop-shadow-xl shadow-red-200`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default DailyExecutionTrend
