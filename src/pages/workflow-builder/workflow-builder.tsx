import { Suspense, useEffect, useState } from 'react'
import { FlowForm } from './flow-form'
import { socket } from '@/lib/socket-io/socket-io'
import { SocketIOEvents } from '@/lib/socket-io/events'
import { YamlSchema, yamlSchema } from '@/schemas/FlowSchema'
import { FlowSelector } from './components/FlowSelector/FlowSelector'
import { FlowCodePreview } from '@/components/workflow-builder/FlowCodePreview'

export function WorkflowBuilder() {
  const [schema, setSchema] = useState<YamlSchema | null>(null)

  useEffect(() => {
    socket.connect()

    socket.on('exception', (data) => console.log(data))

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit(
        SocketIOEvents.GET_FLOW_SCHEMA,
        { flowSchemaId: 'ec99ff6b-75ce-401d-82df-0e434c7df2f8' },
        (success: boolean) => {
          console.log(success)
        },
      )

      socket.on(SocketIOEvents.GET_FLOW_SCHEMA, (ASchema) => {
        const { success, data, error } = yamlSchema.safeParse(ASchema)

        if (success && data) {
          setSchema(data)

          return
        }

        if (error) {
          console.error(error)
        }
      })
    })

    return () => {
      socket.off('connect')
    }
  }, [])

  return (
    <main className="my-auto flex w-full flex-col items-center space-y-3">
      <div className="mx-5 flex w-full flex-col gap-3 lg:max-w-lg">
        <Suspense fallback={<div>loading</div>}>
          <FlowSelector />
        </Suspense>
      </div>

      <section className="mx-5 flex w-full flex-col gap-3 lg:max-w-lg">
        {schema && <FlowForm schema={schema} />}
      </section>

      <FlowCodePreview
        yamlCode={
          'name: GitHub Actions\non:  ["pull", "push"]\njobs:\n\truns-on: "ubunto"'
        }
      />
    </main>
  )
}
