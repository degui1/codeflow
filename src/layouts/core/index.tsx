import { Header } from '@/components/header'
import { Outlet } from 'react-router'

export function CoreLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>
      <div className="flex flex-1 flex-col py-10">
        <Outlet />
      </div>
    </div>
  )
}
