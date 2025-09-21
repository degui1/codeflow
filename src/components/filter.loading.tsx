import { useTranslation } from 'react-i18next'
import { Fragment } from 'react/jsx-runtime'

import { Button } from './ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Skeleton } from './ui/skeleton'

export function FilterLoading() {
  const { t } = useTranslation()

  return (
    <Card className="flex w-full flex-col items-center md:h-full md:min-w-70">
      <CardHeader className="flex w-full flex-col items-center space-y-1">
        <CardTitle>{t('filter')}</CardTitle>

        <CardDescription>
          {t('useTheFiltersToMakeYourSearchEasier')}
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full flex-1">
        <form className="flex w-full flex-col space-y-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <Fragment key={value}>
              <Skeleton className="w-16">
                <Label className="opacity-0">{t('loading')}</Label>
              </Skeleton>

              <Skeleton>
                <Input className="opacity-0" />
              </Skeleton>
            </Fragment>
          ))}
        </form>
      </CardContent>

      <CardFooter className="flex w-full flex-col space-y-2">
        <Skeleton className="w-full">
          <Button size="full" variant="ghost">
            <span className="opacity-0">{t('reset')}</span>
          </Button>
        </Skeleton>

        <Skeleton className="w-full">
          <Button type="submit" size="full">
            <span className="opacity-0">{t('filter')}</span>
          </Button>
        </Skeleton>
      </CardFooter>
    </Card>
  )
}
