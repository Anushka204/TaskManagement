import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Image, Plus, Star } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useCycle } from "../../context/CycleContext"
import { DialogClose } from "../ui/dialog"
import { TABS } from "../../constants/dashboard"
import { Separator } from "../ui/separator"

const VisionBoard = ({ setCurrentTab }) => {
  const { currentCycle, updateCycle } = useCycle()
  const [image, setImage] = useState(currentCycle?.visionBoardImage || "")

  useEffect(() => {
    setImage(currentCycle?.visionBoardImage || "")
  }, [currentCycle])

  const handleAddVisionBoard = () => {
    if (!image) {
      alert("Please enter a vision board URL")
      return
    }
    updateCycle({ ...currentCycle, visionBoardImage: image })
  }

  const dialog = (
    <Dialog>
      <DialogTrigger className='h-full w-full cursor-pointer flex flex-col gap-3 justify-center items-center'>
        <div className='bg-neutral-800 text-lime-400 p-5 rounded-full'>
          <Image />
        </div>
        <span className='text-sm font-bold text-neutral-500 flex items-center'>
          <Plus className='h-4' /> Add your vision board
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Vision Board</DialogTitle>
        </DialogHeader>
        <Input
          type='url'
          placeholder='Enter vision board image url here'
          className='bg-neutral-100 rounded-lg p-2 w-full'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <DialogFooter>
          <div className='flex justify-end gap-2'>
            <DialogClose>
              <button
                type='submit'
                onClick={handleAddVisionBoard}
                className='px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:drop-shadow-lg transition-all text-white font-bold rounded-lg'
              >
                Save
              </button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className='p-6 bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 rounded-lg h-full w-full flex flex-col'>
      <h2 className='text-sm font-bold mb-2 text-white uppercase lexend-giga-700'>
        Vision Board
      </h2>
      <Separator />
      <div className='h-full flex items-center w-full justify-between my-3'>
        {image ? (
          <div className='w-full grid grid-cols-2 gap-10 items-center'>
            <div className='relative cursor-pointer w-80 h-80 rounded-lg flex gap-3 justify-start items-center'>
              <img className='rounded-lg w-full h-full' src={image}></img>
              <div className='absolute z-10 top-0 left-0 rounded-lg bg-black opacity-0 hover:opacity-80 w-80 h-80 transition-all'>
                {dialog}
              </div>
            </div>
            <div className='h-full bg-neutral-900 rounded-md p-6'>
              <h4 className='text-sm flex items-center gap-2 font-bold mb-2 lexend-giga-700 text-neutral-100 uppercase'>
                <Star /> Your Top Goals
              </h4>
              {currentCycle.goals?.splice(0, 3).map((goal) => (
                <div
                  key={goal.id}
                  className='my-2 bg-neutral-100 rounded-full px-4 py-2'
                >
                  <span className='font-bold text-sm text-neutral-800'>
                    {goal.title}
                  </span>
                </div>
              ))}
              {currentCycle.goals.length === 0 && (
                <div>
                  <span className='text-sm text-neutral-500'>
                    No goals added yet!
                  </span>
                  <button
                    className='flex gap-2 items-center my-5 px-4 py-1 bg-lime-300 font-bold rounded-full uppercase legend-giga-700 text-xs'
                    onClick={() => setCurrentTab(TABS.CYCLE)}
                  >
                    <Plus className='h-6 rounded-full p-1' />
                    Start adding goals
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='relative cursor-pointer w-full h-full rounded-lg border border-dashed border-neutral-400 bg-neutral-50 hover:bg-neutral-100 flex gap-3 flex-col justify-center items-center'>
            {dialog}
          </div>
        )}
      </div>
    </div>
  )
}

export default VisionBoard
