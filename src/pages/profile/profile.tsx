import { ThumbsUp } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Card } from '@/components/ui/card'

import { useQuery } from '@tanstack/react-query'
import ProfileService from '@/services/ProfileService'
import { Template } from '../community/community'
import { useUserInfo } from '@/hooks/useUserInfo'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination'
import { UserPanel } from './components/UserPanel'

type UserPosts = {
  posts: Template[]
}

export function Profile() {
  const { data: dataUser } = useUserInfo()

  const { data: dataUserHistory } = useQuery<UserPosts>({
    queryKey: ['profile-get-user-post-history'],
    queryFn: ProfileService.getHistory,
  })

  return (
    <div className="flex w-full max-w-[1360px] flex-1 flex-col gap-7 p-5 lg:flex-row-reverse lg:self-center">
      <aside className="flex w-full flex-col items-center justify-between space-y-5 sm:flex-1 md:space-y-0 lg:max-w-[300px]">
        <UserPanel likes={0} posts={0} />
      </aside>

      <main className="grid w-full max-w-[960px] grid-cols-1 gap-9 sm:grid-cols-2 xl:grid-cols-3">
        {Array.isArray(dataUserHistory?.posts) ? (
          dataUserHistory.posts.map((item, i) => (
            <article key={i}>
              <header>
                <h1>{item.title}</h1>
              </header>

              <main>
                <Card className="flex h-60 flex-col justify-between p-4 md:h-40">
                  <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
                    <Button variant="outline">Visualize</Button>
                    <Button variant="outline">Download</Button>
                  </div>
                </Card>
              </main>

              <footer className="flex w-full items-baseline justify-between text-xs">
                <span className="text-left font-bold text-gray-400">
                  by {dataUser?.username}
                </span>
                <div className="text-right font-bold text-gray-400">
                  <Button size="icon" variant="ghost">
                    <ThumbsUp />
                  </Button>
                  <span>{item._count?.Like ?? 0}</span>
                </div>
              </footer>
            </article>
          ))
        ) : (
          <span className="m-auto">Nenhum template encontrado</span>
        )}

        <footer className="col-span-full flex justify-center">
          <Pagination className="">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </footer>
      </main>
    </div>
  )
}
