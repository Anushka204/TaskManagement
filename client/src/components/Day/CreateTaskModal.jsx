import { useState } from "react"
import { format } from "date-fns"
import { STATUS } from "../../constants/dashboard"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

export default function CreateTaskModal({
  hideModal,
  cycleId,
  goals,
  addTask,
  currentTask,
  updateTask,
}) {
  const today = new Date()
  const [newTask, setNewTask] = useState(
    currentTask || {
      title: "",
      goalId: "",
      dueDate: today.toISOString(),
      cycleId,
      status: "todo",
    }
  )

  const [error, setError] = useState(null)

  const handleCreateTask = async (e) => {
    e.preventDefault()
    try {
      await addTask(newTask)
      hideModal()
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "Failed to create task")
    }
  }

  const handleUpdateTask = async (e) => {
    e.preventDefault()
    try {
      await updateTask(newTask)
      hideModal()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <DialogContent className='bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-lg p-6'>
      <DialogHeader>
        <DialogTitle className='text-lg text-lime-400 uppercase lexend-giga-700'>
          Add new Task
        </DialogTitle>
        <Separator className='my-3' />
      </DialogHeader>
      <form
        onSubmit={currentTask ? handleUpdateTask : handleCreateTask}
        className='flex flex-col gap-5'
      >
        <div>
          <Label htmlFor='title' className='text-xs text-neutral-400'>
            Title
          </Label>
          <Input
            placeholder='For ex: Workout...'
            className='bg-neutral-800 mt-3 border-neutral-700 text-neutral-100 rounded-lg p-2 w-full'
            type='text'
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className='bg-neutral-800 hover:bg-neutral-800 mt-3 border-neutral-700 text-neutral-100 hover:text-neutral-100 rounded-lg p-2 w-full'
              >
                {newTask.dueDate ? (
                  format(newTask.dueDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={newTask.dueDate}
                onSelect={(d) => setNewTask({ ...newTask, dueDate: d })}
                initialFocus
                asChild
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className='text-xs text-neutral-400'>Goal</Label>
          <Select
            onValueChange={(value) => setNewTask({ ...newTask, goalId: value })}
            value={newTask.goalId}
          >
            <SelectTrigger className='mt-3 bg-neutral-800 border-neutral-700 rounded-lg p-2 w-full'>
              <SelectValue
                placeholder='Select a goal...'
                className='text-neutral-100'
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {goals.map((goal) => (
                  <SelectItem key={goal._id} value={goal._id}>
                    {goal.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className='text-xs text-neutral-400'>Status</Label>
          <Select
            onValueChange={(value) => setNewTask({ ...newTask, status: value })}
            value={newTask.status}
          >
            <SelectTrigger className='mt-3 bg-neutral-800 border-neutral-700 rounded-lg p-2 w-full'>
              <SelectValue
                placeholder='Select an option...'
                className='text-neutral-100'
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {STATUS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <div>
            <button
              type='submit'
              className='text-sm px-4 py-2 bg-lime-400 text-neutral-900 lexend-giga-700 uppercase font-bold rounded-lg'
            >
              Save
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
