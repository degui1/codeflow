import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationPreviousButton,
  PaginationNextButton,
  PaginationButton,
} from '@/components/ui/pagination'
import { FlowPreview } from '@/components/Flow/flow-preview'
import { Skeleton } from '@/components/ui/skeleton'

export function HistoryLoading() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <section className="grid w-full flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((post) => (
          <Skeleton key={post}>
            <span className="sr-only">
              <FlowPreview
                post={{
                  _count: { likes: 0 },
                  created_at: new Date(),
                  description: '',
                  downloads: 0,
                  flow: { content: ' ' },
                  id: ' ',
                  title: '',
                  updated_at: new Date(),
                  user: { username: '' },
                  user_id: '',
                  visibility: 'PRIVATE',
                }}
                isOwner
              />
            </span>
          </Skeleton>
        ))}
      </section>

      <Pagination className="mt-1">
        <PaginationContent>
          <PaginationItem>
            <PaginationPreviousButton disabled />
          </PaginationItem>
          <PaginationItem className="flex gap-2">
            {[1, 2].map((_page, i) => (
              <Skeleton key={i} className="w-full">
                <PaginationButton>{i + 1}</PaginationButton>
              </Skeleton>
            ))}
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNextButton disabled />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
