import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Outlet } from 'react-router'

export function CoreLayout() {
  return (
    <div className="flex min-h-screen flex-col gap-10">
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
