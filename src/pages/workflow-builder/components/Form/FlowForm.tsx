import { YamlSchema } from '@/schemas/FlowSchema'
import { FlowGroup } from './FlowGroup'
import { useState } from 'react'
import { FlowSelector } from '../FlowSelector/FlowSelector'
import { SafeSuspense } from '@/components/safe-suspense'
import { FlowSelectorLoading } from '../FlowSelector/FlowSelector.loading'

export function FlowForm() {
  const [schema, setSchema] = useState<YamlSchema | null>(null)

  return (
    <div className="flex flex-1 flex-col items-center space-y-3">
      <SafeSuspense fallback={<FlowSelectorLoading />}>
        <FlowSelector onChangeSchema={setSchema} />
      </SafeSuspense>

      <section className="mx-5 flex w-full flex-col gap-3 lg:max-w-lg">
        {schema &&
          Object.entries(schema.groups).map(([keyGroup, group]) => {
            return <FlowGroup key={keyGroup} group={group} />
          })}
      </section>
    </div>
  )
}
