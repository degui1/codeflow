import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Group } from '@/schemas/FlowSchema'

interface GroupProps {
  group: Group
}

export type FieldType = 'string' | 'number' | 'boolean' | 'list' | 'object'

export type Field = {
  type: FieldType
  nameableKey?: boolean
  label?: string
  help?: string
  defaultValues?: unknown[]
  itemType?: FieldType
  required?: boolean
  fields?: Record<string, Field>
}

export function GroupCard({
  group: { label, description, fields = {} },
}: GroupProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-2.5">
        {Object.entries(fields).map(([fieldKey, field]) => {
          if (
            (field.type === 'string' || field.type === 'number') &&
            !field.defaultValues
          ) {
            return (
              <div key={fieldKey} className="flex w-full items-center gap-3">
                <Label htmlFor={fieldKey}>{field.label}</Label>
                <Input
                  className="w-full lg:max-w-72"
                  required={field.required}
                  type={field.type === 'string' ? 'text' : 'number'}
                  id={fieldKey}
                  placeholder={fieldKey}
                />
              </div>
            )
          }

          if (field.type === 'list') {
            if (
              (field.itemType === 'string' || field.itemType === 'number') &&
              !field.defaultValues
            ) {
              return (
                <div
                  key={fieldKey}
                  className="flex w-full items-center justify-end gap-3"
                >
                  <Label htmlFor={fieldKey}>{fieldKey}</Label>
                  <Input
                    className="w-full lg:max-w-72"
                    required={field.required}
                    type={field.itemType === 'string' ? 'text' : 'number'}
                    id={fieldKey}
                    placeholder={fieldKey}
                  />
                </div>
              )
            }

            if (
              (field.itemType === 'string' || field.itemType === 'number') &&
              field.defaultValues
            ) {
              return (
                <div
                  key={fieldKey}
                  className="flex w-full items-center justify-end gap-3"
                >
                  <Label htmlFor={fieldKey}>{fieldKey}</Label>
                  <Select>
                    <SelectTrigger className="w-full lg:max-w-72">
                      <SelectValue placeholder={fieldKey} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.defaultValues.map((defaultValue) => (
                        <SelectItem
                          key={String(defaultValue)}
                          value={String(defaultValue)}
                        >
                          {String(defaultValue)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )
            }
          }
        })}
      </CardContent>
    </Card>
  )
}
