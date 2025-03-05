import { Link, useLocation } from 'react-router'
import { NavLinks } from './components/navLinks.tsx'
import { Button } from '@/components/ui/button.tsx'

export function Header() {
  const location = useLocation()

  return (
    <header className="border-b border-gray-100/10 py-6">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-primary-foreground text-2xl font-bold">
          CodeFlow
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <NavLinks
              to="/"
              title="Home"
              isSelected={location.pathname === '/'}
            />
            <NavLinks
              to="/community"
              title="Community"
              isSelected={location.pathname === '/community'}
            />
            <NavLinks
              to="/workflow-builder"
              title="Workflow builder"
              isSelected={location.pathname === '/workflow-builder'}
            />
          </ul>
        </nav>

        <div className="flex gap-4 text-gray-100">
          <button className="cursor-pointer border-gray-100 font-semibold transition-colors hover:border-b">
            Sign in
          </button>
          {/* <button className="cursor-pointer rounded-lg border border-gray-100 bg-gray-100 p-1.5 font-semibold text-gray-800 transition-colors hover:opacity-90">
            Get started
          </button> */}
          <Button variant="destructive">teste</Button>
        </div>
      </div>
    </header>
  )
}
