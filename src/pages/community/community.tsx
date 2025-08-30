import { useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import CommunityService from '@/services/CommunityService'
import { Filter } from '@/components/filter'
import { mockFlows } from '@/components/ui/mockFlows'
import { FlowPreview, Template } from '@/components/ui/flow-preview'

export function Community() {
  const [filter, setFilter] = useState<Filter>({
    idAuthor: '',
    idAction: '',
  })

  const { data } = useQuery<Template[]>({
    queryKey: ['community-flows-posts-get-request'],
    queryFn: CommunityService.getTemplates,
  })

  const callBack = (dataFiltered: Filter) => {
    setFilter({
      idAuthor: dataFiltered.idAuthor,
      idAction: dataFiltered.idAction,
    })
  }

  const filteredTemplates = useMemo(() => {
    return mockFlows?.filter((item: Template) => {
      const matchAuthor =
        !filter?.idAuthor || item.idAuthor === Number(filter.idAuthor)
      const matchAction = !filter?.idAction || item.idAction === filter.idAction

      return matchAuthor && matchAction
    })
  }, [filter?.idAuthor, filter?.idAction, data])

  return (
    <div className="container m-auto">
      <main className="grid w-full grid-cols-3 gap-2">
        <h1 className="col-span-3 h-15 text-2xl font-bold">Community</h1>

        <Filter data={mockFlows ?? []} filteredData={callBack} />

        <section className="col-span-3 pl-6 md:col-span-2 md:m-0 lg:col-span-2">
          <h2 className="mb-2.5 text-2xl">Templates</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates?.map((item: Template) => (
              <FlowPreview
                key={item.id}
                id={item.id}
                code={item.code}
                author={item.author}
                likes={item.likes}
                title={item.title}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
