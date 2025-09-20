import { FlowCodePreview } from '@/components/workflow-builder/FlowCodePreview'

import { useEffect, useState } from 'react'
import { useFlowContext } from '../../hooks/useFlowContext'
import { z } from 'zod'

const flowStringifiedSchema = z.object({
  flow: z.string(),
})

export function FlowEditor() {
  const [flowStringified, setFlowStringified] = useState<string | null>(null)

  const { socket } = useFlowContext()

  useEffect(() => {
    socket.on('create-flow', (AFlow: unknown) => {
      const { success, data } = flowStringifiedSchema.safeParse(AFlow)

      if (success) {
        setFlowStringified(data.flow)
      }
    })

    return () => {
      socket.off('create-flow')
    }
  }, [])

  return flowStringified ? (
    <FlowCodePreview isOwner yamlCode={flowStringified} />
  ) : null
}
