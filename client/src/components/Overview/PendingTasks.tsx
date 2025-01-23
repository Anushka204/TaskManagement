import { Plus } from "lucide-react"
import { useTask } from "../../context/TaskContext"
import { Separator } from "../ui/separator"
import { TABS } from "../../constants/dashboard"

const PendingTasks = ({ setCurrentTab }) => {
  const { tasks } = useTask()

  const pendingTasks = tasks.filter((task) => task.status !== "completed")

  return (
    <div className='p-6 bg-gradient-to-l from-neutral-900 to-neutral-950 border border-neutral-800 rounded-lg h-full'>
      <h2 className='text-sm font-bold mb-2 text-neutral-100 lexend-giga-700 uppercase'>
        Today's Pending Tasks
      </h2>
      <Separator className='mb-2' />
      {tasks.length === 0 && (
        <>
          <div className='flex flex-col gap-2 text-sm my-3'>
            <p className='text-neutral-400 text-s'>No tasks found</p>
          </div>
          <button
            className='flex gap-2 items-center my-5 px-4 py-1 bg-lime-400 font-bold rounded-full uppercase legend-giga-700 text-xs'
            onClick={() => setCurrentTab(TABS.DAY)}
          >
            <Plus className='h-6 rounded-full p-1' />
            Start adding tasks
          </button>
        </>
      )}
      {pendingTasks.length === 0 && tasks.length > 0 && (
        <>
          <div className='flex flex-col gap-2 text-sm my-3'>
            <p className='text-neutral-400 text-sm'>No pending tasks</p>
          </div>
          <button
            className='flex gap-2 items-center my-5 px-4 py-1 bg-lime-400 font-bold rounded-full uppercase legend-giga-700 text-xs'
            onClick={() => setCurrentTab(TABS.DAY)}
          >
            <Plus className='h-6 rounded-full p-1' />
            create more tasks
          </button>
        </>
      )}
      {pendingTasks.length > 0 && (
        <>
          <ul className='flex flex-col gap-2 text-sm my-3'>
            {pendingTasks.map((task, index) => (
              <li
                key={index}
                className='py-2 text-neutral-200 bg-neutral-800 px-2 rounded-md'
              >
                {task.title}
              </li>
            ))}
          </ul>
          <button className='mt-2 bg-lime-400 rounded-full px-3 uppercase legend-giga-700 text-xs py-1 text-neutral-900 font-bold'>
            View all
          </button>
        </>
      )}
    </div>
  )
}

export default PendingTasks
