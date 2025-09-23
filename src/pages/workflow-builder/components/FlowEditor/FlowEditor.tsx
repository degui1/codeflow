import { useEffect, useState } from 'react'
import { z } from 'zod'

import { FlowCodePreview } from '@/components/workflow-builder/FlowCodePreview'

import { useFlowContext } from '../../hooks/useFlowContext'
import { ScrollRestoration } from 'react-router'

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

  return (
    <>
      {flowStringified && (
        <>
          <ScrollRestoration />

          <FlowCodePreview yamlCode={flowStringified} />
        </>
      )}
    </>
  )
}
