import { useState } from "react"
import Cycle from "../components/Cycle/Cycle"
import AppSidebar from "../components/Sidebar/Sidebar.jsx"
import Day from "../components/Day/Day.jsx"
import Overview from "../components/Overview/Overview"
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCycle } from "../context/CycleContext"
import { TABS } from "../constants/dashboard"
import Loader from "@/components/Loader/Loader"
import { Plus } from "lucide-react"
import CreateCycleModal from "@/components/Cycle/CreateCycleModal.tsx"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

const Dashboard = () => {
  const { cycles, loading } = useCycle()

  const [currentTab, setCurrentTab] = useState(TABS.OVERVIEW)
  const [open, setOpen] = useState(false)

  if (loading) {
    return (
      <div className='bg-neutral-950 text-neutral-100 w-screen h-screen flex justify-center items-center'>
        <Loader size='large' />
      </div>
    )
  }

  return (
    <div className='h-screen flex'>
      <SidebarProvider>
        <AppSidebar></AppSidebar>
        <main className='w-full h-full flex flex-col bg-neutral-950 p-2'>
          <SidebarTrigger className='text-neutral-200 mt-2' />
          {cycles.length > 0 ? (
            <Tabs
              value={currentTab}
              onValueChange={setCurrentTab}
              className='w-full h-full flex flex-col'
            >
              <TabsList className='p-3 mb-2 py-5 w-full gap-3 bg-neutral-900 border border-neutral-800'>
                <TabsTrigger value={TABS.OVERVIEW}>Overview</TabsTrigger>
                <TabsTrigger value={TABS.DAY}>Today</TabsTrigger>
                <TabsTrigger value={TABS.WEEK}>This Week</TabsTrigger>
                <TabsTrigger value={TABS.CYCLE}>This Cycle</TabsTrigger>
              </TabsList>
              <TabsContent className='h-full' value={TABS.CYCLE}>
                <Cycle />
              </TabsContent>
              <TabsContent className='h-full' value={TABS.DAY}>
                <Day setCurrentTab={setCurrentTab}></Day>
              </TabsContent>
              <TabsContent className='h-full' value={TABS.OVERVIEW}>
                <Overview setCurrentTab={setCurrentTab} />
              </TabsContent>
              <TabsContent value={TABS.WEEK}>
                <div>To be implemented</div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className='w-full h-72 p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-lg flex flex-col gap-5 justify-center items-center'>
              <span className='text-neutral-400 text-sm'>
                No cycles found. Create one to get started!
              </span>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    onClick={() => setOpen(true)}
                    className='px-4 py-1 bg-lime-400 text-neutral-900 uppercase lexend-giga-700 flex items-center gap-2 hover:drop-shadow-lg transition-all font-bold rounded-full'
                  >
                    <span className='rounded-full text-lime-400 bg-neutral-900 p-2'>
                      <Plus size={15} />
                    </span>
                    <span className="text-xs">Create New Cycle</span>
                  </button>
                </DialogTrigger>
                <CreateCycleModal setOpen={setOpen}></CreateCycleModal>
              </Dialog>
            </div>
          )}
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Dashboard
