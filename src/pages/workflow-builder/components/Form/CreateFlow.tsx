import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

import { useFlowContext } from '../../hooks/useFlowContext'

export function CreateFlow() {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const { socket } = useFlowContext()

  function onCreateFlow() {
    setIsLoading(true)

    socket.timeout(4000).emit('create-flow', undefined, () => {
      setIsLoading(false)
    })
  }
  return (
    <Button onClick={() => onCreateFlow()} disabled={isLoading}>
      {t('create')}
    </Button>
  )
}
