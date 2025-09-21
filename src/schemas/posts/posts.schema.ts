import { z } from 'zod'

export const communityPostsFilterFormSchema = z.object({
  author: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  flowSchemaId: z.string().optional(),
  downloads: z.coerce.number().optional(),
})

export type CommunityPostsFilterForm = z.infer<
  typeof communityPostsFilterFormSchema
>

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
      user_id: z.string().uuid(),
      _count: z.object({
        likes: z.number(),
      }),
      flow: z.object({
        content: z
          .string()
          .transform((content) => content.replace(/\\n/g, '\n')),
      }),
      user: z.object({
        username: z.string(),
      }),
    }),
  ),
  hasNextPage: z.boolean().default(false),
})

export type Posts = z.infer<typeof postsSchema>
