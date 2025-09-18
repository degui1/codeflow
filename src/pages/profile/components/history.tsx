import { ThumbsUp } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Card } from '@/components/ui/card'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useSuspenseQuery } from '@tanstack/react-query'
import ProfileService from '@/services/ProfileService'

export function History() {
  const { data: dataUser } = useUserInfo()

  const {
    data: { posts },
    error,
    isPending,
  } = useSuspenseQuery({
    queryKey: ['profile-get-user-post-history'],
    queryFn: ProfileService.getHistory,
  })

  if (!posts.length || (error && !isPending)) {
    return null
  }

  return (
    <div>
      {posts.map((post, i) => (
        <article key={i}>
          <header>
            <h1>{post.title}</h1>
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
              <span>{post._count.likes ?? 0}</span>
            </div>
          </footer>
        </article>
      ))}

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
    </div>
  )
}
