import { Filter } from '@/components/filter'
import { SafeSuspense } from '@/components/safe-suspense'

import { HistoryLoading } from '../profile/components/history.loading'
import { History } from '../profile/components/history'

export function Community() {
  return (
    <div className="flex w-full max-w-[1360px] flex-1 flex-col gap-7 lg:flex-row lg:self-center">
      <aside className="flex w-full flex-col items-center justify-between space-y-5 sm:flex-1 md:space-y-0 lg:max-w-[300px]">
        <SafeSuspense fallback={<div>loading</div>}>
          <Filter />
        </SafeSuspense>
      </aside>

      <main className="flex max-h-full w-full max-w-[960px]">
        <SafeSuspense fallback={<HistoryLoading />}>
          <History />
        </SafeSuspense>
      </main>
    </div>
  )
}
