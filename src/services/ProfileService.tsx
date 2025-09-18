import { request } from '@/api/api-client'
import { z } from 'zod'

const postsHistorySchema = z.object({
  posts: z.array(
    z.object({
      description: z.string(),
      title: z.string(),
      created_at: z.coerce.date(),
      updated_at: z.coerce.date(),
      downloads: z.number(),
      // visibility: $Enums.Visibility;
      _count: z.object({
        likes: z.number(),
      }),
    }),
  ),
})

const ProfileService = {
  getUserData: async () => {
    const res = await request('GET', '/me')

    return res.json()
  },

  getHistory: async () => {
    const res = await request('GET', '/me/history')

    return postsHistorySchema.parse(await res.json())
  },

  deleteAccount: async () => {
    const res = await request('DELETE', `/me`)

    return res.json()
  },
}

export default ProfileService
