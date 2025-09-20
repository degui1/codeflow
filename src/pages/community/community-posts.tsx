import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { request } from '@/api/api-client'
import { PostsGrid } from '@/components/Posts/posts'
import {
  CommunityPostsFilterForm,
  postsSchema,
} from '@/schemas/posts/posts.schema'
import { EmptyCommunityPosts } from './empty-community-posts'

interface CommunityPostsProps {
  filters: CommunityPostsFilterForm
}

export function CommunityPosts({ filters }: CommunityPostsProps) {
  const {
    data: communityPosts,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['community-get-public-posts', filters],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams()
      params.set('page', String(pageParam))

      if (filters.author) params.set('author', filters.author)
      if (filters.startDate)
        params.set('startDate', filters.startDate.toISOString())
      if (filters.endDate) params.set('endDate', filters.endDate.toISOString())
      if (filters.downloads) params.set('downloads', String(filters.downloads))
      if (filters.flowSchemaId) params.set('flowSchemaId', filters.flowSchemaId)

      const res = await request('GET', `/community?${params.toString()}`)

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
      emptyFallback={EmptyCommunityPosts}
    />
  )
}
