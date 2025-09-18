import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { useAuth } from '@/hooks/useAuthChecker'
import { ROUTES_PATHS } from '@/routes/paths'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

export function CredentialsLoading() {
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()
  return (
    <>
      {isAuthenticated && (
        <>
          <Link to={ROUTES_PATHS.PROFILE}>
            <Skeleton className="size-10 rounded-lg"></Skeleton>
          </Link>
        </>
      )}

      {!isAuthenticated && (
        <>
          <Skeleton>
            <Button
              variant="ghost"
              className="text-background bg-background"
              disabled
            >
              {t('Entrar')}
            </Button>
          </Skeleton>

          <Skeleton>
            <Button className="text-foreground bg-foreground" disabled>
              {t('loading')}
            </Button>
          </Skeleton>
        </>
      )}
    </>
  )
}
