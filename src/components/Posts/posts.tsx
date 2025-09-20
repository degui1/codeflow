import { useMemo, useState } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationPreviousButton,
  PaginationNextButton,
  PaginationButton,
} from '@/components/ui/pagination'
import { FlowPreview } from '@/components/flow-preview'
import { Posts } from '@/schemas/posts/posts.schema'
import { useUserInfo } from '@/hooks/useUserInfo'

interface PostsGridProps {
  hasNextPage: boolean
  fetchNextPage: () => Promise<void>
  pages: Posts[]
  emptyFallback: () => React.JSX.Element
}

export function PostsGrid({
  fetchNextPage,
  hasNextPage,
  pages,
  emptyFallback: EmptyFallback,
}: PostsGridProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const { data: userData } = useUserInfo()

  const posts = useMemo(() => {
    const lastPage = pages[currentPageIndex]?.posts ?? []

    return lastPage
  }, [currentPageIndex])

  return (
    <div className="flex w-full flex-1 flex-col">
      <section className="grid w-full flex-1 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {posts.length === 0 && <EmptyFallback />}

        {posts.map((post) => (
          <FlowPreview
            key={post.id}
            author={post.user.username}
            code={post.flow.content}
            likes={post._count.likes}
            title={post.title}
            isOwner={post.user_id === userData?.id}
          />
        ))}
      </section>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPreviousButton
              disabled={currentPageIndex === 0}
              onClick={() => setCurrentPageIndex((state) => state - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            {pages.map((_page, i) => (
              <PaginationButton
                variant={i === currentPageIndex ? 'outline' : 'ghost'}
                key={i}
                onClick={() => setCurrentPageIndex(i)}
              >
                {i + 1}
              </PaginationButton>
            ))}
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNextButton
              onClick={async () => {
                if (hasNextPage) {
                  await fetchNextPage()
                }
                setCurrentPageIndex((state) => state + 1)
              }}
              disabled={!hasNextPage && currentPageIndex === pages.length - 1}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
