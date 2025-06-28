import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/card'
import CommunityService from '@/services/CommunityService'
import { Filter } from '@/components/filter'

export interface Template {
  id: number
  title: string
  idAuthor: number
  idAction: string
  author: string
}

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
    return data?.filter((item) => {
      const matchAuthor =
        !filter?.idAuthor || item.idAuthor === Number(filter.idAuthor)
      const matchAction = !filter?.idAction || item.idAction === filter.idAction

      return matchAuthor && matchAction
    })
  }, [filter?.idAuthor, filter?.idAction, data])

  return (
    <div className="container m-auto">
      <main className="mt-30 grid w-full grid-cols-3 gap-2">
        <h1 className="col-span-3 h-15 text-2xl font-bold">Community</h1>

        <Filter data={data ?? []} filteredData={callBack} />

        <section className="col-span-3 pl-6 md:col-span-2 md:m-0 lg:col-span-2">
          <h2 className="text-2xl">Templates</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates?.map((item: Template, index: number) => (
              <Card key={index} title={item.title} author={item.author} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
