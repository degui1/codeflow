import { Link, useLocation } from 'react-router'
import { NavLinks } from './components/navLinks.tsx'

export function Header() {
  const location = useLocation()

  return (
    <header className="py-6 border-b">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl text-secondary-foreground font-bold">
          CodeFlow
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <NavLinks to="/" title="Home" isSelected />
            <NavLinks to="/community" title="Community" isSelected={false} />
            <NavLinks
              to="/workflow-builder"
              title="Workflow builder"
              isSelected={false}
            />
          </ul>
        </nav>
        <div className="flex gap-4 text-gray-100">
          <button className="cursor-pointer hover:border-b border-gray-100 transition-colors font-semibold">
            Sign in
          </button>
          <button className="border p-1.5 rounded-lg border-gray-100 bg-ring text-gray-800 cursor-pointer transition-colors font-semibold">
            Get started
          </button>
        </div>
      </div>
    </header>
  )
}
