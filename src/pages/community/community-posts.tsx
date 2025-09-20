import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { request } from '@/api/api-client'
import { PostsGrid } from '@/components/Posts/posts'
import { postsSchema } from '@/schemas/posts/posts.schema'

export function CommunityPosts() {
  const {
    data: communityPosts,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['community-get-public-posts'],
    queryFn: async ({ pageParam }) => {
      const res = await request('GET', `/community?page=${pageParam}`)

      return postsSchema.parse(await res.json())
    },
    initialPageParam: 1,
    getNextPageParam(lastPage, _allPages, lastPageParam) {
      return lastPage.hasNextPage ? lastPageParam + 1 : undefined
    },
    refetchOnMount: false,
  })

  return (
    <PostsGrid
      fetchNextPage={async () => {
        await fetchNextPage()
      }}
      hasNextPage={hasNextPage}
      pages={communityPosts.pages}
    />
  )
}
