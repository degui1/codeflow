import { request } from '@/api/api-client'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'

const flowSchemas = z.array(
  z.object({
    id: z.string(),
    description: z.string(),
  }),
)

export function FlowSelector() {
  const { data: flows } = useSuspenseQuery({
    queryKey: ['workflow-builder-get-flow-schemas-list'],
    queryFn: async () => {
      const response = await request('GET', '/schemas')

      const data = await response.json()

      return flowSchemas.parse(data.flowSchemas)
    },
  })

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Label className="self-start" htmlFor="flow-selector-id">
        Workflow builder
      </Label>
      <Select>
        <SelectTrigger id="flow-selector-id" className="w-full">
          <SelectValue placeholder="Selecione um schema" />
        </SelectTrigger>

        <SelectContent>
          {flows.map(({ id, description }) => (
            <SelectItem key={id} value={id}>
              {description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
