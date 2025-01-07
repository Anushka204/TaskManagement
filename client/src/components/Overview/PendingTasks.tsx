const PendingTasks = () => {
  const tasks = ["Task 1", "Task 2", "Task 3"]

  return (
    <div className='p-4 bg-white rounded-lg'>
      <h2 className='text-lg font-bold mb-2'>Today's Pending Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className='py-1 text-gray-700'>
            {task}
          </li>
        ))}
      </ul>
      <button className='mt-2 text-blue-500 underline'>View all</button>
    </div>
  )
}

export default PendingTasks
