import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useFlowContext } from '../../hooks/useFlowContext'
import { useTranslation } from 'react-i18next'

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
