import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useAuth } from '@/hooks/useAuthChecker'
import { useUserInfo } from '@/hooks/useUserInfo'

import { useState } from 'react'
import { Settings } from './settings'
import { useTranslation } from 'react-i18next'
import { useSuspenseQuery } from '@tanstack/react-query'
import { request } from '@/api/api-client'
import { z } from 'zod'

const userSummarySchema = z.object({
  flows: z.number(),
  likes: z.number(),
  downloads: z.number(),
})

export function UserPanel() {
  const [isSettingsOpened, setIsSettingsOpened] = useState(false)

  const { logout } = useAuth()
  const { data: dataUser } = useUserInfo()
  const { t } = useTranslation()

  const { data: summary } = useSuspenseQuery({
    queryKey: ['profile-get-user-summary'],
    queryFn: async () => {
      const response = await request('GET', '/me/summary')

      const data = userSummarySchema.parse(await response.json())

      return data
    },
  })

  return (
    <>
      <Card className="flex w-full flex-col items-center md:h-full md:min-w-70">
        <CardHeader className="flex w-full flex-col items-center space-y-4">
          <Avatar className="rounded-lg">
            <AvatarImage
              src={dataUser?.image ?? undefined}
              alt={dataUser?.username}
            />
            <AvatarFallback>
              {dataUser?.username?.charAt(0).toUpperCase() ?? 'UN'}
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle>{dataUser?.name}</CardTitle>

            <CardDescription>{dataUser?.email}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex w-full flex-1 flex-col space-y-4">
          <div className="bg-foreground/10 flex justify-between rounded-md px-4 py-2">
            <span className="font-semibold">{t('flows')}</span>
            <span className="font-bold">{summary.flows}</span>
          </div>

          <div className="bg-foreground/10 flex justify-between rounded-md px-4 py-2">
            <span className="font-semibold">{t('likes')}</span>
            <span className="font-bold">{summary.likes}</span>
          </div>

          <div className="bg-foreground/10 flex justify-between rounded-md px-4 py-2">
            <span className="font-semibold">{t('downloads')}</span>
            <span className="font-bold">{summary.downloads}</span>
          </div>
        </CardContent>

        <CardFooter className="flex w-full flex-col space-y-2">
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => setIsSettingsOpened(true)}
          >
            {t('settings')}
          </Button>

          <Button
            className="w-full"
            variant="destructive"
            size="sm"
            onClick={() => logout()}
          >
            {t('logout')}
          </Button>
        </CardFooter>
      </Card>

      <Settings
        open={isSettingsOpened}
        onClose={() => setIsSettingsOpened(false)}
      />
    </>
  )
}
