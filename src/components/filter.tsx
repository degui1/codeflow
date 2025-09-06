import { useState } from 'react'
import { Icons } from '@/assets/icons'

import { Button } from './ui/button'
import { Template } from '@/pages/community/community'

interface DataProps {
  data: Template[]
  filteredData: (filter: Filter) => void
}

export interface Filter {
  idAuthor: string
  idAction: string
}

export const Filter = ({ data, filteredData }: DataProps) => {
  const [filter, setFilter] = useState<Filter>({
    idAuthor: '',
    idAction: '',
  })

  const actions = [
    { idAction: '1', actionName: 'Push' },
    { idAction: '2', actionName: 'Pull' },
    { idAction: '3', actionName: 'Full' },
  ]

  return (
    <section className="col-span-1 hidden h-120 rounded-3xl border p-10 md:block lg:block">
      <h2 className="text-2xl">Filter</h2>
      <div className="m-2">
        <div className="border-accent mt-4 flex border-b-2">
          <Icons.magnifyinGlass size={24} className="m-2 h-auto" />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full focus:border-0 focus:outline-none"
          />
        </div>

        <div className="block">
          <label className="mt-4 ml-2 block text-lg font-medium">Action</label>
          <select
            value={filter.idAction}
            onChange={(e) => {
              const newFilter = { ...filter, idAction: e.target.value }
              setFilter(newFilter)
              filteredData(newFilter)
            }}
            className="w-full rounded-lg border p-2"
          >
            <option className="bg-black" value="">
              All actions
            </option>

            {actions.map((item, index) => (
              <option value={item.idAction} className="bg-black" key={index}>
                {item.actionName}
              </option>
            ))}
          </select>
        </div>

        <label className="mt-2 ml-2 block text-lg font-medium">Author</label>

        <div className="flex justify-between align-middle">
          <select
            value={filter.idAuthor}
            onChange={(e) => {
              const newFilter = { ...filter, idAuthor: e.target.value }
              setFilter(newFilter)
              filteredData(newFilter)
            }}
            className="w-full rounded-lg border p-2"
          >
            <option className="bg-black" value="">
              All authors
            </option>

            {data.map((item, index) => (
              <option value={item.idAuthor} className="bg-black" key={index}>
                {item.author}
              </option>
            ))}
          </select>
        </div>

        <Button
          className="mt-8"
          variant={'secondary'}
          size={'full'}
          onClick={() => {
            const resetFilter = { idAuthor: '', idAction: '' }
            setFilter(resetFilter)
            filteredData(resetFilter)
          }}
        >
          Reset
        </Button>
      </div>
    </section>
  )
}
