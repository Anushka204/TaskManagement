import { useState } from "react"
import { format } from "date-fns"
import CreateTaskModal from "./CreateTaskModal"
import Task from "./Task"
import { useCycle } from "../../context/CycleContext"
import { useTask } from "../../context/TaskContext"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { TABS } from "../../constants/dashboard"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { DndProvider, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export default function Day({ setCurrentTab }) {
  const { currentCycle } = useCycle()
  const {
    tasks,
    addTask,
    dailyScore,
    removeTask,
    updateTask,
    dueDate,
    setDueDate,
  } = useTask()
  const [open, setOpen] = useState(false)

  if (currentCycle.goals.length === 0) {
    return (
      <div className='bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-lg p-6'>
        <h2 className='text-xl text-lime-400 uppercase lexend-giga-700 flex items-center'>
          Today
        </h2>
        <p className='text-neutral-400 text-xs my-3'>
          No goals found. Please create a goal to get started.
        </p>
        <Separator />
        <button
          className='flex gap-2 items-center my-5 px-4 py-1 bg-lime-400 text-neutral-900 font-bold rounded-full uppercase legend-giga-700 text-xs'
          onClick={() => setCurrentTab(TABS.CYCLE)}
        >
          <Plus className='h-6 rounded-full p-1' />
          Add Cycle Goals
        </button>
      </div>
    )
  }

  const completedTasks = tasks.filter((task) => task.status === "completed")
  const todoTasks = tasks.filter((task) => task.status === "todo")
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress")

  const TaskColumn = ({ status, tasks }) => {
    const [, drop] = useDrop(() => ({
      accept: 'task',
      drop: (item) => {
        updateTask({ ...item.task, status })
      },
    }))

    return (
      <div ref={drop} className='w-full rounded-lg'>
        <h4 className='font-bold'>{status === 'todo' ? 'Todo' : status === 'in-progress' ? 'In Progress' : 'Completed'}</h4>
        {tasks.map((task) => (
          <Task
            task={task}
            key={task._id}
            cycleId={currentCycle._id}
            deleteTask={removeTask}
            updateTask={updateTask}
            goals={currentCycle.goals}
          />
        ))}
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-lg p-6'>
        <div className='flex justify-between'>
          <h2 className='text-xl uppercase flex items-center'>
            Today{" "}
            <span className='text-neutral-400 text-sm ml-3'>
              {dueDate ? dueDate.toLocaleDateString() : 'No date selected'}
            </span>
          </h2>
          <span className="flex items-center gap-2">
            <span className="text-neutral-300">Execution Score:</span>
            <span className="text-lime-400 font-bold">
              {dailyScore === null ? 'N/A' : `${dailyScore.toFixed(2)}%`}
            </span>
          </span>
        </div>
        <div className='my-5'>
          <label>Select day:</label>
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className='bg-neutral-800 hover:bg-neutral-800 mt-3 border-neutral-700 text-neutral-100 hover:text-neutral-100 rounded-lg p-2 w-full'
              >
                {dueDate ? (
                  format(dueDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={dueDate}
                onSelect={(value) => setDueDate(value)}
                initialFocus
                asChild
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='w-full grid grid-cols-3 gap-3'>
          <TaskColumn status="todo" tasks={todoTasks} />
          <TaskColumn status="in-progress" tasks={inProgressTasks} />
          <TaskColumn status="completed" tasks={completedTasks} />
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => setOpen(true)}
                className='flex items-center gap-2 text-sm mt-5 px-4 py-2 text-neutral-900 bg-lime-400 hover:drop-shadow-lg transition-all font-bold rounded-md lexend-giga-700 uppercase'
              >
                <Plus />
                <span>Create New Task</span>
              </button>
            </DialogTrigger>
            <CreateTaskModal
              cycleId={currentCycle._id}
              goals={currentCycle.goals}
              hideModal={() => setOpen(false)}
              addTask={addTask}
            ></CreateTaskModal>
          </Dialog>
        </div>
      </div>
    </DndProvider>
  )
}
