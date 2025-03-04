import { Outlet } from 'react-router'
import { Header } from './components/Header/header.tsx'

export function CoreLayout() {
  return (
    <div className="bg-foreground h-lvh">
      <Header />

      <div className="">
        <Outlet />
      </div>
    </div>
  )
}
