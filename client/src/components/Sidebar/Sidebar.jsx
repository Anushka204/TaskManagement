import { useEffect, useState } from "react"
import CreateCycleModal from "../Cycle/CreateCycleModal.tsx"
import { Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { getUser } from "../../services/userService.js"
import { useCycle } from "../../context/CycleContext.jsx"
import { getDailyScore } from "../../services/dailyScoreService.js"

export default function AppSidebar() {
  const [user, setUser] = useState({})
  const [open, setOpen] = useState(false)
  const [dailyScore, setDailyScore] = useState(0)
  const { cycles, loading } = useCycle()

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const data = await getUser()
        setUser(data.user)
      }
      fetchUser()
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    try {
      const fetchDailyScore = async () => {
        const today = new Date()
        const data = await getDailyScore(today.toISOString().split("T")[0])
        setDailyScore(data.executionScore)
      }
      fetchDailyScore()
    } catch (error) {
      console.error(error)
    }
  }, [])

  if (loading) {
    return <div>Loading cycles...</div>
  }

  return (
    <Sidebar variant='floating' className='bg-neutral-950'>
      <SidebarHeader>
        <div className='flex p-3 gap-2 w-full justify-between items-center'>
          <div
            className='w-14 h-14 rounded-full bg-lime-400 bg-cover'
            style={{ backgroundImage: `url('${user?.profilePicture}')` }}
          ></div>
          <div className='w-9/12 flex flex-col justify-between'>
            <span className='font-bold lexend-giga-700 text-xs'>{user?.username || user?.email}</span>
            <div className=''>
              <span className='text-xs font-bold text-neutral-400'>
                Today's Execution Score
              </span>
              <Progress className='mt-1' value={dailyScore} />
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className='p-1 uppercase font-bold text-neutral-100 lexend-giga-700'>
              Current Cycle
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className='p-3'>
                {cycles.length > 0 ? (
                  <div className='flex flex-col gap-3'>
                    {cycles.map((cycle) => (
                      <div
                        key={cycle._id}
                        className='cursor-pointer bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-800 rounded-md px-5 py-3'
                      >
                        <span>{cycle.title}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p>No cycles found. Create one to get started!</p>
                  </>
                )}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => setOpen(true)}
                      className='mt-5 p-2 border border-dashed border-neutral-600 flex items-center gap-2 hover:drop-shadow-lg transition-all font-bold rounded-full'
                    >
                      <span className='rounded-full bg-lime-400 text-neutral-900 p-2'>
                        <Plus />
                      </span>
                      Create New Cycle
                    </button>
                  </DialogTrigger>
                  <CreateCycleModal setOpen={setOpen}></CreateCycleModal>
                </Dialog>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className='p-1 uppercase font-bold text-neutral-100 lexend-giga-700'>
              Past Cycles
            </span>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
