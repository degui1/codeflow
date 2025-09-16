import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Group } from '@/schemas/FlowSchema'

import { FlowField } from './Fields/FlowField'

interface GroupProps {
  group: Group
  groupKey: string
}

export function FlowGroup({
  group: { label, description, fields = {} },
  groupKey,
}: GroupProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-2.5">
        {Object.entries(fields).map(([fieldKey, field]) => {
          return (
            <FlowField
              key={fieldKey}
              field={field}
              groupKey={groupKey}
              fieldKey={fieldKey}
            />
          )
        })}
      </CardContent>
    </Card>
  )
}
