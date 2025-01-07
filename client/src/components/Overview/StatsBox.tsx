type StatsBoxProps = {
  value: string
  label: string
}

const StatsBox: React.FC<StatsBoxProps> = ({ value, label }) => {
  return (
    <div className='p-4 bg-neutral-800 text-neutral-100 rounded-lg text-center w-full h-full'>
      <span className='text-2xl font-bold'>{value}</span>
      <p className='text-sm'>{label}</p>
    </div>
  )
}

export default StatsBox
