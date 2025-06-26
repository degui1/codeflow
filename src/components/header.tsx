import { Link } from 'react-router'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b py-6 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold">
          <img src="/codeflow_logo.png" alt="" width={60} height={80} />
        </Link>

        <nav>
          <ul>
            <Button
              variant="link"
              asChild
              onClick={() =>
                document
                  .getElementsByTagName('main')[0]
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            >
              <Link to="/">Home</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/community">Community</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/workflow-builder">Builder</Link>
            </Button>
            <Button
              variant="link"
              asChild
              onClick={() =>
                document
                  .getElementById('features-section')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className="cursor-pointer"
            >
              <Link to="/">Ferramentas</Link>
            </Button>
          </ul>
        </nav>

        <div className="flex gap-1">
          <Button variant="ghost" asChild>
            <Link to="/">Entrar</Link>
          </Button>
          <Button asChild>
            <Link to="/">Comece agora</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
