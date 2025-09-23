import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSuspenseQuery } from '@tanstack/react-query'

import { request } from '@/api/api-client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { YamlSchema, yamlSchema } from '@/schemas/FlowSchema'

import { useFlowContext } from '../../hooks/useFlowContext'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useFlowStore } from '@/hooks/useFlowStore'

const flowSchemas = z.array(
  z.object({
    id: z.string(),
    description: z.string(),
  }),
)

const flowSchemaSelectorFormSchema = z.object({
  flowSchemaId: z.string().uuid(),
})

type FlowSchemaSelectorForm = z.infer<typeof flowSchemaSelectorFormSchema>

interface FlowSelectorProps {
  onChangeSchema: (schema: YamlSchema | null) => void
}

export function FlowSelector({ onChangeSchema }: FlowSelectorProps) {
  const { t } = useTranslation()
  const { socket } = useFlowContext()
  const { setFlowSchemaId } = useFlowStore()

  const form = useForm<FlowSchemaSelectorForm>({
    resolver: zodResolver(flowSchemaSelectorFormSchema),
    defaultValues: {
      flowSchemaId: '',
    },
  })

  const { data: flows } = useSuspenseQuery({
    queryKey: ['workflow-builder-get-flow-schemas-list'],
    queryFn: async () => {
      const response = await request('GET', '/schemas')

      const data = await response.json()

      return flowSchemas.parse(data.flowSchemas)
    },
  })

  function onSubmit(submittedData: FlowSchemaSelectorForm) {
    socket.emit('get-flow-schema', {
      flowSchemaId: submittedData.flowSchemaId,
    })

    socket.on('get-flow-schema', (ASchema) => {
      const { success, data, error } = yamlSchema.safeParse(ASchema)

      if (success && data) {
        onChangeSchema(data)

        setFlowSchemaId(submittedData.flowSchemaId)

        return
      }

      if (error) {
        toast.error(error.message)
      }
    })
  }

  useEffect(() => {
    return () => {
      socket.off('get-flow-schema')
    }
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3"
      >
        <FormField
          name="flowSchemaId"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Flow builder</FormLabel>

                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger id="flow-selector-id" className="w-full">
                      <SelectValue placeholder={t('selectSchema')} />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {flows.map(({ id, description }) => (
                      <SelectItem key={id} value={id}>
                        {description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )
          }}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="reset"
            variant="destructive"
            onClick={() => {
              form.reset()
              onChangeSchema(null)
              setFlowSchemaId('')
            }}
            size="sm"
          >
            {t('cancel')}
          </Button>

          <Button
            type="submit"
            variant="outline"
            size="sm"
            disabled={form.formState.isSubmitSuccessful}
          >
            {t('send')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
