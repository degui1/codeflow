import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AlignJustify } from 'lucide-react'

import { ScrollToHash } from '@/utils/scrollToHash'

import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import ToggleLanguage from '../toggleLanguage'
import { SafeSuspense } from '../safe-suspense'
import { Credentials } from './credentials'
import { CredentialsLoading } from './credentials.loading'

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < breakpoint)

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [breakpoint])

  return isMobile
}

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

        <nav className="flex items-center space-x-4">
          {!isMobile && (
            <>
              <ul>
                <Button variant="link" asChild>
                  <a href="/#home">Home</a>
                </Button>
                <Button variant="link" asChild>
                  <Link to="/community">{t('Comunidade')}</Link>
                </Button>
                <Button variant="link" asChild>
                  <Link to="/workflow-builder">Builder</Link>
                </Button>
                <Button variant="link" asChild>
                  <a href="/#features-section">Ferramentas</a>
                </Button>
              </ul>
            </>
          )}

          {isMobile && (
            <ul>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <AlignJustify />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Home</DropdownMenuLabel>
                  <DropdownMenuItem>{t('Comunidade')}</DropdownMenuItem>
                  <DropdownMenuItem>Builder</DropdownMenuItem>
                  <DropdownMenuItem>Ferramentas</DropdownMenuItem>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <ToggleLanguage />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </ul>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <ToggleLanguage />

          <SafeSuspense fallback={<CredentialsLoading />}>
            <Credentials />
          </SafeSuspense>
        </div>
      </div>
    </header>
  )
}
