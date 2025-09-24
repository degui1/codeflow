import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { request } from '@/api/api-client'
import { PostsGrid } from '@/components/Posts/posts'
import { postsSchema } from '@/schemas/posts/posts.schema'
import { EmptyProfilePosts } from './empty-profile-posts'

export function ProfilePosts() {
  const {
    data: history,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['profile-get-user-post-history'],
    queryFn: async ({ pageParam }) => {
      const res = await request('GET', `/me/history?page=${pageParam}`)

      return postsSchema.parse(await res.json())
    },
    initialPageParam: 1,
    getNextPageParam(lastPage, _allPages, lastPageParam) {
      return lastPage.hasNextPage ? lastPageParam + 1 : undefined
    },
  })

  return (
    <PostsGrid
      fetchNextPage={async () => {
        await fetchNextPage()
      }}
      hasNextPage={hasNextPage}
      pages={history.pages}
      emptyFallback={EmptyProfilePosts}
      canEdit
    />
  )
}
