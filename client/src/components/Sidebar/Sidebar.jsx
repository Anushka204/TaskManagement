import { useEffect, useState } from "react"
import CreateCycleModal from "../Cycle/CreateCycleModal.tsx"
import { VIEWS } from "../../constants/dashboard"
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

export default function AppSidebar({
  switchView,
  loading,
  error,
  cycles,
  setCycles,
}) {
  const [user, setUser] = useState({})

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

  if (loading) {
    return <div>Loading cycles...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <Sidebar variant='floating'>
      <SidebarHeader>
        <div className='flex p-3 gap-2 w-full justify-between items-center'>
          <div
            className='w-14 h-14 rounded-full bg-yellow-300 bg-cover'
            style={{ backgroundImage: `url('${user?.profilePicture}')` }}
          ></div>
          <div className='w-9/12 flex flex-col justify-between'>
            <span className='font-bold'>{user?.username || user?.email}</span>
            <div className=''>
              <span className='text-xs font-bold text-neutral-400'>
                Today's Execution Score
              </span>
              <Progress className="mt-1" value={33} />
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className='p-1 uppercase font-bold text-neutral-100'>
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
                        onClick={() => switchView(VIEWS.CYCLE, cycle)}
                        key={cycle._id}
                        className='cursor-pointer bg-neutral-700 rounded-full px-5 py-3'
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
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className='mt-5 p-2 border border-dashed border-neutral-600 flex items-center gap-2 hover:drop-shadow-lg transition-all font-bold rounded-full'
                    >
                      <span className='rounded-full bg-yellow-300 text-neutral-900 p-2'>
                        <Plus />
                      </span>
                      Create New Cycle
                    </button>
                  </DialogTrigger>
                  <CreateCycleModal
                    setCycles={setCycles}
                    cycles={cycles}
                    switchCycleView={switchView}
                    hideModal={() => setShowModal(false)}
                  ></CreateCycleModal>
                </Dialog>
                <button
                  className='mt-10 text-xs'
                  onClick={() => switchView(VIEWS.DAY, cycles[0])}
                >
                  Switch to daily view
                </button>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className='p-1 uppercase font-bold text-neutral-100'>
              Past Cycles
            </span>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
