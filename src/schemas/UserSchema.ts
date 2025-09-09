import { z } from 'zod'

export type User = z.infer<typeof userSchema>

export const userSchema = z.object({
  image: z.string().nullable(),
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.coerce.date(),
})
