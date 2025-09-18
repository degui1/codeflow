import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination'
import { FlowPreview } from '@/components/flow-preview'
import ProfileService from '@/services/ProfileService'
import { useMemo, useState } from 'react'

export function History() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const {
    data: history,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['profile-get-user-post-history'],
    queryFn: async ({ pageParam }) => ProfileService.getHistory(pageParam),
    initialPageParam: 1,
    getNextPageParam(lastPage, _allPages, lastPageParam) {
      return lastPage.hasNextPage ? lastPageParam + 1 : undefined
    },
    refetchOnMount: false,
  })

  const posts = useMemo(() => {
    const lastPage = history.pages[currentPageIndex]?.posts ?? []

    return lastPage
  }, [currentPageIndex])

  if (!history.pages[0].posts.length || (error && !isPending)) {
    return null
  }

  return (
    <div className="flex w-full flex-1 flex-col">
      <section className="grid w-full flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <FlowPreview
            key={post.id}
            author={post.user.username}
            code={post.flow.content}
            likes={post._count.likes}
            title={post.title}
            isOwner
          />
        ))}
      </section>

      <Pagination>
        <PaginationContent>
          {currentPageIndex > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPageIndex((state) => state - 1)}
              />
            </PaginationItem>
          )}
          <PaginationItem>
            {history.pages.map((page, i) => (
              <PaginationLink key={page.posts[0].id}>{i + 1}</PaginationLink>
            ))}
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasNextPage && (
            <PaginationItem>
              <PaginationNext
                onClick={async () => {
                  await fetchNextPage()
                  setCurrentPageIndex((state) => state + 1)
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
