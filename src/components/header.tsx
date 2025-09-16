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

import { ROUTES_PATHS } from '@/routes/paths'
import { authStore } from '@/stores/authStore'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useUserLogin } from '@/hooks/useUserLogin'
import { ScrollToHash } from '@/utils/scrollToHash'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'
import ToggleLanguage from './toggleLanguage'

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
  const isAuthenticated = authStore((state) => state.isAuthenticated)

  const isMobile = useIsMobile()

  const { data: userInfo, isLoading, isSuccess } = useUserInfo()

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

          {isSuccess && (
            <>
              <Link to={ROUTES_PATHS.PROFILE}>
                <Avatar className="rounded-lg">
                  <AvatarImage
                    src={userInfo?.image ?? undefined}
                    alt={userInfo?.username}
                  />
                  <AvatarFallback>
                    {userInfo?.username?.charAt(0).toUpperCase() ?? 'U'}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          )}

          {!userInfo && !isLoading && !isAuthenticated && (
            <>
              <Button
                variant="ghost"
                asChild
                onClick={(e) => {
                  e.preventDefault()
                  useUserLogin()
                }}
              >
                <Link to={ROUTES_PATHS.HOME}>{t('Entrar')}</Link>
              </Button>
              <Button asChild>
                <Link to={ROUTES_PATHS.HOME}>{t('Comece agora')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
