import { FlowCodePreview } from '@/components/workflow-builder/FlowCodePreview'
import { useSocket } from '@/hooks/useSocket'
import { useEffect } from 'react'

export function WorkflowBuilder() {
  const io = useSocket()

  useEffect(() => {
    const handleConnect = () => {
      console.log('Conexão estabelecida: ' + io.id)
    }
    io.on('connect', handleConnect)
    return () => {
      io.off('connect', handleConnect)
    }
  }, [io])

  return (
    <>
      <div>workflow-builder</div>
      <FlowCodePreview
        yamlCode={
          'name: GitHub Actions\non:  ["pull", "push"]\njobs:\n\truns-on: "ubunto"'
        }
      />
    </>
  )
}
