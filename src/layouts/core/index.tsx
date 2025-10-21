import { BottomTabs } from '@/components/header/bottomTabs'
import { Header } from '@/components/header/header'
import { Outlet } from 'react-router'

export function CoreLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>
      <div className="md: flex flex-1 flex-col px-10 py-10">
        <Outlet />
      </div>
      <div className="sticky bottom-0 w-full border py-2">
        <div className="bg-foreground/10 absolute inset-0 backdrop-blur-md"></div>

        <BottomTabs />
      </div>
    </div>
  )
}
