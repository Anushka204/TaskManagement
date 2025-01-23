import { Sparkle } from "lucide-react"

type StatsBoxProps = {
  value: string
  label: string
}

const StatsBox: React.FC<StatsBoxProps> = ({ value, label }) => {
  return (
    <div className='p-6 bg-gradient-to-l from-neutral-900 to-neutral-950 border border-neutral-800 rounded-lg text-center w-full h-full flex flex-col gap-5 justify-center items-center'>
      <Sparkle className='text-neutral-100' />
      <div className='text-lime-400 lexend-giga-400 text-4xl'>
        <span>{value}</span>
      </div>
      <span className='text-sm font-bold lexend-giga-700 text-neutral-100 uppercase'>
        {label}
      </span>
    </div>
  )
}

export default StatsBox
