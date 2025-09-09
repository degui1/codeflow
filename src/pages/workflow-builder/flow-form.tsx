import { YamlSchema } from '@/schemas/FlowSchema'
import { GroupCard } from './group'

interface FlowFormProps {
  schema: YamlSchema
}

export function FlowForm({ schema }: FlowFormProps) {
  return Object.entries(schema.groups).map(([keyGroup, group]) => {
    return <GroupCard key={keyGroup} group={group} />
  })
}
