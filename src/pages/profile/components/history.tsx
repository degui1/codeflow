import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

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
import ProfileService from '@/services/ProfileService'
import { useMemo, useState } from 'react'
import { Siren } from 'lucide-react'
import { Link } from 'react-router'
import { ROUTES_PATHS } from '@/routes/paths'

export function History() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const {
    data: history,
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

  return (
    <div className="flex w-full flex-1 flex-col">
      <section className="grid w-full flex-1 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {posts.length === 0 && (
          <div className="[background-image:repeating-radial-gradient(circle,theme(colors.background)_0,theme(colors.foreground)_0.1px,theme(color.background)_1px,transparent_14px)] col-span-3 flex flex-1 flex-col items-center justify-center space-y-8 [background-size:20px_20px]">
            <Siren size={32} className="text-amber-300 opacity-100" />

            <h2 className="text-lg font-semibold">
              Não há posts para o seu perfil. Aproveite e vá para{' '}
              <Link
                className="text-amber-300"
                to={ROUTES_PATHS.WORKFLOW_BUILDER}
              >
                Builder
              </Link>{' '}
              e crie!
            </h2>
          </div>
        )}

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
          <PaginationItem>
            <PaginationPreviousButton
              disabled={currentPageIndex === 0}
              onClick={() => setCurrentPageIndex((state) => state - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            {history.pages.map((_page, i) => (
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
              disabled={
                !hasNextPage && currentPageIndex === history.pages.length - 1
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
