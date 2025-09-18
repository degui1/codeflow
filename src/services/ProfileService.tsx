import { request } from '@/api/api-client'
import { z } from 'zod'

const postsHistorySchema = z.object({
  posts: z.array(
    z.object({
      id: z.string(),
      description: z.string(),
      title: z.string(),
      created_at: z.coerce.date(),
      updated_at: z.coerce.date(),
      downloads: z.number(),
      visibility: z.enum(['PRIVATE', 'PUBLIC']),
      _count: z.object({
        likes: z.number(),
      }),
      flow: z.object({
        content: z.string(),
      }),
      user: z.object({
        username: z.string(),
      }),
    }),
  ),
  hasNextPage: z.boolean().default(false),
})

const ProfileService = {
  getUserData: async () => {
    const res = await request('GET', '/me')

    return res.json()
  },

  getHistory: async (page: number = 0) => {
    const res = await request('GET', `/me/history?page=${page}`)

    return postsHistorySchema.parse(await res.json())
  },

  deleteAccount: async () => {
    const res = await request('DELETE', `/me`)

    return res.json()
  },
}

export default ProfileService
