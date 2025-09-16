import { Help } from '@/components/help'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFlowContext } from '@/pages/workflow-builder/hooks/useFlowContext'

import { Field } from '@/schemas/FlowSchema'
import { useId, useState } from 'react'

interface FlowField {
  field: Field
  groupKey: string
  fieldKey: string
}

export function FlowField({ field, groupKey, fieldKey }: FlowField) {
  const key = useId()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { socket } = useFlowContext()

  function onCompleteInput(value: unknown) {
    socket.timeout(5000).emit(
      'set-field-data',
      {
        value: value,
        path: `groups.${groupKey}.fields.${fieldKey}`,
      },
      () => {
        setIsSubmitting(false)
      },
    )

    setIsSubmitting(true)
  }

  return (
    <div className="flex w-full items-center justify-center gap-3">
      <Label htmlFor={key}>{field.label}</Label>

      <Help info={field.help ?? ''}>
        {(field.type === 'string' || field.type === 'number') &&
          !field.defaultValues && (
            <Input
              className="w-full flex-1 lg:max-w-72"
              required={field.required}
              type={field.type === 'string' ? 'text' : 'number'}
              id={key}
              placeholder={field.label}
              disabled={isSubmitting}
              onBlur={(e) => onCompleteInput(e.target.value)}
            />
          )}

        {field.type === 'list' && (
          <>
            {(field.itemType === 'string' || field.itemType === 'number') &&
              !field.defaultValues && (
                <Input
                  className="w-full lg:max-w-72"
                  required={field.required}
                  type={field.itemType === 'string' ? 'text' : 'number'}
                  id={key}
                  placeholder={field.label}
                  disabled={isSubmitting}
                  onBlur={(e) => onCompleteInput([e.target.value])}
                />
              )}

            {(field.itemType === 'string' || field.itemType === 'number') &&
              field.defaultValues && (
                <Select
                  onValueChange={(value) => onCompleteInput([value])}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-full lg:max-w-72">
                    <SelectValue id={key} placeholder={field.label} />
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
              )}
          </>
        )}
      </Help>
    </div>
  )
}
