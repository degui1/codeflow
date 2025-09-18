import { SafeSuspense } from '@/components/safe-suspense'
import { History } from './components/history'
import { UserPanel } from './components/user-panel'
import { UserPanelLoading } from './components/user-panel.loading'

export function Profile() {
  return (
    <div className="flex w-full max-w-[1360px] flex-1 flex-col gap-7 p-5 lg:flex-row-reverse lg:self-center">
      <aside className="flex w-full flex-col items-center justify-between space-y-5 sm:flex-1 md:space-y-0 lg:max-w-[300px]">
        <SafeSuspense fallback={<UserPanelLoading />}>
          <UserPanel likes={0} posts={0} />
        </SafeSuspense>
      </aside>

      <main className="flex w-full max-w-[960px]">
        <SafeSuspense fallback={<div>loading</div>}>
          <History />
        </SafeSuspense>
      </main>
    </div>
  )
}
