import { Link } from 'react-router'
import { Button } from './ui/button'
import '../utils/i18n'
import { useTranslation } from 'react-i18next'
import ToggleLanguage from './toggleLanguage'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useUserLogin } from '@/hooks/useUserLogin'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { ScrollToHash } from '@/utils/scrollToHash'

export function Header() {
  const { t } = useTranslation()
  const userInfo = useUserInfo()

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/30 border-b py-3 backdrop-blur">
      <ScrollToHash />
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold">
          <img src="/codeflow_logo.png" alt="" width={60} height={80} />
        </Link>

        <nav>
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
        </nav>

        <div></div>
        <div className="flex gap-1">
          <ToggleLanguage style={{ marginRight: 20 }} />
          {!userInfo && (
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
        {userInfo && (
          <div>
            <Avatar>
              <AvatarImage
                src={userInfo?.image}
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
                BO
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </header>
  )
}
