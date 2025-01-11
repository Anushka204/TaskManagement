import { NotebookPen } from "lucide-react"
import { TABS } from "../../constants/dashboard"

const LogProgress = ({ setCurrentTab }) => {
  return (
    <div
      onClick={() => setCurrentTab(TABS.DAY)}
      className='p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 cursor-pointer  w-full h-full rounded-lg flex justify-center gap-4 items-center'
    >
      <span className='bg-neutral-800 text-lime-400 p-4 rounded-full'>
        <NotebookPen className='h-5' />
      </span>
      <span className='uppercase font-bold lexend-giga-700 text-neutral-100'>Log Progress</span>
    </div>
  )
}

export default LogProgress
