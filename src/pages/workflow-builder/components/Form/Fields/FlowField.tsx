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

interface FlowFieldProps {
  field: Field
  groupKey: string
  fieldKey: string
  path?: string
  level?: number
}

export function FlowField({
  field,
  fieldKey,
  groupKey,
  path,
  level = 0,
}: FlowFieldProps) {
  const key = useId()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { socket } = useFlowContext()

  const currentPath = path ?? `groups.${groupKey}.fields.${fieldKey}`
  const indentClass = `pl-${Math.min(level * 4, 12)}`

  function onCompleteInput(value: unknown) {
    setIsSubmitting(true)
    socket.timeout(5000).emit(
      'set-field-data',
      {
        value,
        path: currentPath,
      },
      () => {
        setIsSubmitting(false)
      },
    )
  }

  if (field.defaultValues) {
    return (
      <div className="flex w-full items-center justify-center gap-3">
        <Label className="lg:w-32">{field.label}</Label>
        <Help info={field.help ?? ''}>
          <Select
            onValueChange={(value) =>
              field.type === 'list' || field.type === 'object'
                ? onCompleteInput([value])
                : onCompleteInput(value)
            }
            disabled={isSubmitting}
          >
            <SelectTrigger className="w-full">
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
        </Help>
      </div>
    )
  }

  if (
    field.type === 'string' ||
    field.type === 'number' ||
    field.type === 'boolean'
  ) {
    return (
      <div className="flex w-full items-center justify-center gap-3">
        <Label className="lg:w-32">{field.label}</Label>
        <Help info={field.help ?? ''}>
          <Input
            required={field.required}
            type={field.type === 'string' ? 'text' : field.type}
            id={key}
            placeholder={field.label}
            disabled={isSubmitting}
            onBlur={(e) => {
              let value: unknown = e.target.value
              if (field.type === 'number') value = Number(value)
              if (field.type === 'boolean') value = value === 'true'
              onCompleteInput(value)
            }}
          />
        </Help>
      </div>
    )
  }

  if (field.type === 'list' && field.itemType) {
    if (field.itemType === 'object' && field.fields) {
      return (
        <div className={'flex w-full flex-col justify-center gap-3'}>
          <div className="flex gap-3">
            <Help info={field.help ?? ''}>
              <Label>{field.label}</Label>

              {field.nameableKey && (
                <Input
                  className="max-w-28"
                  required={field.required}
                  type="string"
                  id={key}
                  placeholder={field.label}
                  disabled={isSubmitting}
                  onBlur={(e) => {
                    let value: unknown = e.target.value
                    if (field.type === 'number') value = Number(value)
                    if (field.type === 'boolean') value = value === 'true'
                    onCompleteInput(value)
                  }}
                />
              )}
            </Help>
          </div>

          <div className={`flex w-full flex-col gap-2 ${indentClass}`}>
            {Object.entries(field.fields).map(([subKey, subField]) => (
              <FlowField
                key={subKey}
                field={subField}
                fieldKey={subKey}
                groupKey={groupKey}
                path={`${currentPath}[].${subKey}`}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )
    }
    return (
      <div className="flex w-full items-center justify-center gap-3">
        <Label className="lg:w-32">{field.label}</Label>
        <Help info={field.help ?? ''}>
          <Input
            required={field.required}
            type={field.itemType === 'string' ? 'text' : field.itemType}
            id={key}
            placeholder={field.label}
            disabled={isSubmitting}
            onBlur={(e) => {
              let value: unknown = e.target.value
              if (field.itemType === 'number') value = Number(value)
              if (field.itemType === 'boolean') value = value === 'true'
              onCompleteInput([value])
            }}
          />
        </Help>
      </div>
    )
  }

  if (field.type === 'object' && field.fields) {
    return (
      <div className={'flex w-full flex-col justify-center gap-3'}>
        <div className="flex gap-3">
          <Help info={field.help ?? ''}>
            {!field.nameableKey && <Label>{field.label}</Label>}

            {field.nameableKey && (
              <Input
                className="max-w-28"
                required={field.required}
                type="string"
                id={key}
                placeholder={field.label}
                disabled={isSubmitting}
                onBlur={(e) => {
                  let value: unknown = e.target.value
                  if (field.type === 'number') value = Number(value)
                  if (field.type === 'boolean') value = value === 'true'
                  onCompleteInput(value)
                }}
              />
            )}
          </Help>
        </div>

        <div className={`flex w-full flex-col gap-2 ${indentClass}`}>
          {Object.entries(field.fields).map(([subKey, subField]) => (
            <FlowField
              key={subKey}
              field={subField}
              fieldKey={subKey}
              groupKey={groupKey}
              path={`${currentPath}[].${subKey}`}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    )
  }

  return null
}
