import { Header } from '@/components/header'
import { Outlet } from 'react-router'

export function CoreLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
