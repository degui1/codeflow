import { BottomTabs } from '@/components/header/bottomTabs'
import { Header } from '@/components/header/header'
import { Outlet } from 'react-router'

export function CoreLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>
      <div className="md: flex flex-1 flex-col px-0 px-10 py-10">
        <Outlet />
      </div>
      <div className="fixed bottom-0 h-10 w-full border-b">
        <BottomTabs />
      </div>
    </div>
  )
}
