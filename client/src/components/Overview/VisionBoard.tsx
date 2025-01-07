import { Input } from "@/components/ui/input"

const VisionBoard = () => {
  return (
    <div className='p-4 bg-white rounded-lg h-full w-full flex flex-col'>
      <h2 className='text-lg font-bold mb-2'>Vision Board</h2>
      <div className='w-full h-full rounded-lg border border-dashed border-neutral-400 bg-neutral-100 flex justify-center items-center'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Input id='picture' type='file' />
        </div>
      </div>
    </div>
  )
}

export default VisionBoard
