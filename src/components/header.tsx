import { Link } from 'react-router'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 w-full border-b py-6 backdrop-blur">
      <div className="sticky container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold">
          CodeFlow
        </Link>

        <nav>
          <ul>
            <Button variant="link" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/community">Community</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/workflow-builder">Workflow builder</Link>
            </Button>
          </ul>
        </nav>

        <div className="flex gap-1">
          <Button variant="ghost" asChild>
            <Link to="/">Sign in</Link>
          </Button>
          <Button asChild>
            <Link to="/">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
