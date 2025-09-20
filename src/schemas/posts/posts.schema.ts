import { z } from 'zod'

export const postsSchema = z.object({
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

export type Posts = z.infer<typeof postsSchema>
