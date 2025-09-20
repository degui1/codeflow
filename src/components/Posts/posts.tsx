import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Siren } from 'lucide-react'

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
import { ROUTES_PATHS } from '@/routes/paths'
import { Posts } from '@/schemas/posts/posts.schema'

interface PostsGridProps {
  hasNextPage: boolean
  fetchNextPage: () => Promise<void>
  pages: Posts[]
}

export function PostsGrid({
  fetchNextPage,
  hasNextPage,
  pages,
}: PostsGridProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const posts = useMemo(() => {
    const lastPage = pages[currentPageIndex]?.posts ?? []

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
