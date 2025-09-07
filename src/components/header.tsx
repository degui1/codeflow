import { AlignJustify } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'
import ToggleLanguage from './toggleLanguage'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useUserLogin } from '@/hooks/useUserLogin'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { ScrollToHash } from '@/utils/scrollToHash'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

import { useEffect, useState } from 'react'
import { authStore } from '@/stores/authStore'

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
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/30 border-b py-3 backdrop-blur">
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
                  <DropdownMenuItem>Comunity</DropdownMenuItem>
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

        <div></div>
        <div className="flex gap-1">
          <ToggleLanguage style={{ marginRight: 30 }} />
          {isAuthenticated && (
            <>
              <Link to="/profile">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    width={50}
                    className="rounded-4xl"
                  />
                  <AvatarFallback>CN</AvatarFallback>
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
                <Link to="/">{t('Entrar')}</Link>
              </Button>
              <Button asChild>
                <Link to="/">{t('Comece agora')}</Link>
              </Button>
            </>
          )}
        </div>
        {isSuccess && (
          <div>
            <Avatar>
              <AvatarImage
                src={userInfo?.image ?? undefined}
                alt={userInfo?.username}
                width={60}
                height={80}
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = '/profile'
                }}
              ></AvatarImage>
              <AvatarFallback
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = '/profile'
                }}
              >
                {userInfo?.username?.charAt(0).toUpperCase() ?? 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        {/* {isError && <div>Erro</div>} */}
      </div>
    </header>
  )
}
