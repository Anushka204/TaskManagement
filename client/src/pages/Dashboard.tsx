import Cycle from "../components/Cycle/Cycle"
import AppSidebar from "../components/Sidebar/Sidebar.jsx"
import Day from "../components/Day/Day.jsx"
import Overview from "../components/Overview/Overview"
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCycle } from "../context/CycleContext"
import { useState } from "react"
import { TABS } from "../constants/dashboard"

const Dashboard = () => {
  const { cycles, loading } = useCycle()
  const [currentTab, setCurrentTab] = useState(TABS.OVERVIEW)

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
              <TabsContent className="h-full" value={TABS.CYCLE}>
                <Cycle />
              </TabsContent>
              <TabsContent className="h-full" value={TABS.DAY}>
                <Day setCurrentTab={setCurrentTab}></Day>
              </TabsContent>
              <TabsContent className="h-full" value={TABS.OVERVIEW}>
                <Overview setCurrentTab={setCurrentTab} />
              </TabsContent>
              <TabsContent value={TABS.WEEK}>
                <div>To be implemented</div>
              </TabsContent>
            </Tabs>
          ) : (
            <div>
              {loading || "No cycles found. Create one to get started!"}
            </div>
          )}
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Dashboard
