import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'

export function FlowSelectorLoading() {
  const { t } = useTranslation()
  return (
    <div className="flex w-full flex-col gap-3">
      <Label>Flow builder</Label>

      <Skeleton>
        <Select>
          <SelectTrigger id="flow-selector-id" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>
      </Skeleton>

      <Skeleton>
        <Button disabled variant={'ghost'} className="w-full opacity-0">
          {t('loading')}
        </Button>
      </Skeleton>
    </div>
  )
}
