import { Link } from 'react-router'

export function Footer() {
  return (
    <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 w-full border-t py-10 backdrop-blur">
      <div className="container flex flex-col gap-5 px-10 lg:mr-auto lg:ml-auto lg:flex-row lg:items-center lg:justify-center lg:gap-x-10">
        <nav>
          <span className="font-semibold">Visão geral</span>
          <ul className="text-muted-foreground flex flex-col gap-2 py-2">
            <li>
              <Link to="/">Sobre nós</Link>
            </li>
            <li>
              <Link to="/">Perguntas Frequentes</Link>
            </li>
            <li>
              <Link to="/">Tutorial</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <span className="font-semibold">Recursos</span>
          <ul className="text-muted-foreground flex flex-col gap-2 py-2">
            <li
              onClick={() =>
                document
                  .getElementsByTagName('main')[0]
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            >
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/community">Comunidade</Link>
            </li>
            <li>
              <Link to="/workflow-builder">Workflow Builder</Link>
            </li>
          </ul>
        </nav>
        <span className="text-muted-foreground text-sm lg:ml-auto">
          © {new Date().getFullYear()} Codeflow. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  )
}
