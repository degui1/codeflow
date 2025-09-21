import { useState } from 'react'

import { Filter } from '@/components/filter'
import { SafeSuspense } from '@/components/safe-suspense'
import { CommunityPostsFilterForm } from '@/schemas/posts/posts.schema'
import { FilterLoading } from '@/components/filter.loading'

import { HistoryLoading } from '../../components/Posts/posts.loading'
import { CommunityPosts } from './community-posts'

export function Community() {
  const [filters, setFilters] = useState<CommunityPostsFilterForm>({})

  return (
    <div className="flex w-full max-w-[1360px] flex-1 flex-col gap-7 lg:flex-row lg:self-center">
      <aside className="flex w-full flex-col items-center justify-between space-y-5 sm:flex-1 md:space-y-0 lg:max-w-[300px]">
        <SafeSuspense fallback={<FilterLoading />}>
          <Filter onChangeFilter={setFilters} />
        </SafeSuspense>
      </aside>

      <main className="flex max-h-full w-full max-w-[960px]">
        <SafeSuspense fallback={<HistoryLoading />}>
          <CommunityPosts key={JSON.stringify(filters)} filters={filters} />
        </SafeSuspense>
      </main>
    </div>
  )
}
