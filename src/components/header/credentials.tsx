import { t } from 'i18next'
import { Link } from 'react-router'

import { useUserLogin } from '@/hooks/useUserLogin'
import { ROUTES_PATHS } from '@/routes/paths'

import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useAuth } from '@/hooks/useAuthChecker'

export function Credentials() {
  const { isAuthenticated } = useAuth()
  const { data: userInfo } = useUserInfo()

  return (
    <>
      {isAuthenticated && (
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

      {!isAuthenticated && (
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
    </>
  )
}
