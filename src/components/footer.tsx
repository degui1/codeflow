import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import '../utils/i18n'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 w-full border-t py-10 backdrop-blur">
      <div className="container flex flex-col gap-5 px-10 lg:mr-auto lg:ml-auto lg:flex-row lg:items-center lg:justify-center lg:gap-x-10">
        <nav>
          <span className="font-semibold">{t('Visão geral')}</span>
          <ul className="text-muted-foreground flex flex-col gap-2 py-2">
            <li>
              <Link to="/">{t('Sobre nós')}</Link>
            </li>
            <li>
              <Link to="/">{t('Perguntas frequentes')}</Link>
            </li>
            <li>
              <Link to="/">Tutorial</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <span className="font-semibold">{t('Recursos')}</span>
          <ul className="text-muted-foreground flex flex-col gap-2 py-2">
            <li>
              <Link to="/#home">Home</Link>
            </li>
            <li>
              <Link to="/community">{t('Comunidade')}</Link>
            </li>
            <li>
              <Link to="/workflow-builder">Workflow Builder</Link>
            </li>
          </ul>
        </nav>
        <span className="text-muted-foreground text-sm lg:ml-auto">
          © {new Date().getFullYear()} Codeflow.{' '}
          {t('Todos os direitos reservados.')}
        </span>
      </div>
    </footer>
  )
}
