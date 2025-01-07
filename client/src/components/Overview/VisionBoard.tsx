import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Image, Plus } from "lucide-react"
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

const VisionBoard = () => {
  const { currentCycle, updateCycle } = useCycle()
  const [image, setImage] = useState("")

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
        <div className='bg-neutral-800 text-yellow-300 p-5 rounded-full'>
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
    <div className='p-4 bg-white rounded-lg h-full w-full flex flex-col'>
      <h2 className='text-lg font-bold mb-2'>Vision Board</h2>
      <div className="h-full">
        {image ? (
          <div className='relative cursor-pointer w-1/2 h-full rounded-lg flex gap-3 justify-start items-center'>
            <img className='rounded-lg w-full h-full' src={image}></img>
            <div className='absolute z-10 top-0 left-0 rounded-lg bg-black opacity-0 hover:opacity-80 w-full h-full transition-all'>
              {dialog}
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
