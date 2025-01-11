import { Separator } from "../ui/separator"

const PendingTasks = () => {
  const tasks = ["Task 1", "Task 2", "Task 3"]

  return (
    <div className='p-6 bg-gradient-to-l from-neutral-900 to-neutral-950 border border-neutral-800 rounded-lg h-full'>
      <h2 className='text-sm font-bold mb-2 text-neutral-100 lexend-giga-700 uppercase'>
        Today's Pending Tasks
      </h2>
      <Separator className='mb-2' />
      <ul className='flex flex-col gap-2 text-sm my-3'>
        {tasks.map((task, index) => (
          <li key={index} className='py-2 text-neutral-200 bg-neutral-800 px-2 rounded-md'>
            {task}
          </li>
        ))}
      </ul>
      <button className='mt-2 bg-lime-300 rounded-full px-3 uppercase legend-giga-700 text-xs py-1 text-neutral-900 font-bold'>
        View all
      </button>
    </div>
  )
}

export default PendingTasks
