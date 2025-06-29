import { Link } from 'react-router'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'
import ToggleLanguage from './toggleLanguage'

export function Header() {
  const { t } = useTranslation()

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
              <Link to="/">{t('Inicio')}</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/community">{t('Comunidade')}</Link>
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
              <Link to="/">{t('Ferramentas')}</Link>
            </Button>
          </ul>
        </nav>

        <div></div>

        <div className="flex gap-1">
          <ToggleLanguage style={{ marginRight: 20 }} />
          <Button variant="ghost" asChild>
            <Link to="/">{t('Entrar')}</Link>
          </Button>
          <Button asChild>
            <Link to="/">{t('Comece agora')}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
