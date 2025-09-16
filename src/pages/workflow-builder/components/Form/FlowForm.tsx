import { useState } from 'react'

import { YamlSchema } from '@/schemas/FlowSchema'
import { SafeSuspense } from '@/components/safe-suspense'

import { FlowSelector } from '../FlowSelector/FlowSelector'
import { FlowSelectorLoading } from '../FlowSelector/FlowSelector.loading'
import { CreateFlow } from './CreateFlow'
import { EmptyFlowGroup } from './EmptyFlowGroup'
import { FlowGroup } from './FlowGroup'

export function FlowForm() {
  const [schema, setSchema] = useState<YamlSchema | null>(null)

  return (
    <div className="flex flex-1 flex-col items-center space-y-3 lg:max-w-3xl">
      <SafeSuspense fallback={<FlowSelectorLoading />}>
        <FlowSelector onChangeSchema={setSchema} />
      </SafeSuspense>

      <section className="flex w-full flex-1 flex-col gap-3">
        {schema &&
          Object.entries(schema.groups).map(([groupKey, group]) => {
            return (
              <FlowGroup key={groupKey} group={group} groupKey={groupKey} />
            )
          })}

        {!schema && <EmptyFlowGroup />}

        {schema && <CreateFlow />}
      </section>
    </div>
  )
}
