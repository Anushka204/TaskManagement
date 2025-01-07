const WeeklyExecutionTrend = () => {
  return (
    <div className='p-4 bg-white rounded-lg h-full w-full'>
      <h2 className='text-lg font-bold mb-2'>Weekly Execution Trend</h2>
      <div className='flex justify-between items-end h-24'>
        {[10, 30, 50, 70, 40, 80, 60].map((value, index) => (
          <div
            key={index}
            style={{ height: `${value}%` }}
            className='w-6 bg-teal-500'
          ></div>
        ))}
      </div>
    </div>
  )
}

export default WeeklyExecutionTrend
