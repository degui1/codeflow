import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { useTranslation } from 'react-i18next'

export function UserPanelLoading() {
  const { t } = useTranslation()

  return (
    <Card className="flex w-full flex-col items-center md:h-full">
      <CardHeader className="flex w-full flex-col items-center space-y-4">
        <Skeleton className="size-10 rounded-lg" />

        <div className="flex flex-col items-center space-y-0.5">
          <CardTitle>
            <Skeleton className="h-4 w-40" />
          </CardTitle>

          <CardDescription>
            <Skeleton className="h-4 w-20" />
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex w-full flex-1 flex-col space-y-4">
        <Skeleton>
          <div className="bg-foreground/10 flex justify-between rounded-md px-4 py-2">
            <span className="text-foreground/10">{t('flows')}</span>
          </div>
        </Skeleton>

        <Skeleton>
          <div className="bg-foreground/10 flex justify-between rounded-md px-4 py-2">
            <span className="text-foreground/10">{t('likes')}</span>
          </div>
        </Skeleton>
      </CardContent>

      <CardFooter className="flex w-full flex-col space-y-2">
        <Skeleton className="w-full">
          <Button className="w-full" variant="ghost">
            <span className="sr-only">{t('settings')}</span>
          </Button>
        </Skeleton>

        <Skeleton className="w-full">
          <Button className="w-full" variant="destructive">
            <span className="sr-only">{t('logout')}</span>
          </Button>
        </Skeleton>
      </CardFooter>
    </Card>
  )
}
