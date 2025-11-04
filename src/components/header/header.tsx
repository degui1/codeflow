import { Link } from 'react-router'

import { ScrollToHash } from '@/utils/scrollToHash'

import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import { SafeSuspense } from '../safe-suspense'
import { Credentials } from './credentials'
import { CredentialsLoading } from './credentials.loading'
import { useIsMobile } from '@/hooks/useIsMobile'
import ToggleLanguage from '../toggleLanguage'

export function Header() {
  const { t } = useTranslation()

  const isMobile = useIsMobile()

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/30 h-20 border-b py-3 backdrop-blur">
      <ScrollToHash />

      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold">
          <img src="/codeflow_logo.png" alt="" width={60} height={80} />
        </Link>

        {!isMobile && (
          <nav className="flex items-center space-x-4">
            <div className="flex">
              <Button variant="link" asChild>
                <a href="/#home">{t('home')}</a>
              </Button>
              <Button variant="link" asChild>
                <Link to="/community">{t('Comunidade')}</Link>
              </Button>
              <Button variant="link" asChild>
                <Link to="/workflow-builder">Builder</Link>
              </Button>
              <Button variant="link" asChild>
                <a href="/#features-section">{t('tools')}</a>
              </Button>
            </div>
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <SafeSuspense fallback={<CredentialsLoading />}>
            <Credentials />
          </SafeSuspense>
          {!isMobile && <ToggleLanguage />}
        </div>
      </div>
    </header>
  )
}
