import { request } from '@/api/api-client'
import { userSchema } from '@/schemas/UserSchema'
import { useQuery } from '@tanstack/react-query'

export function useUserInfo() {
  const query = useQuery({
    queryFn: async () => {
      const response = await request('GET', '/me')
      const json = await response.json()

      if (json != undefined) {
        const { success, data } = userSchema.safeParse(json)

        if (!success) return null

        return data
      }

      return null
    },
    queryKey: ['get-logged-user-information'],
    staleTime: 60 * 5 * 1000,
  })
  return query
}

export interface UserInfo {
  image: string
  username: string
  name: string
  email: string
  createdAt: string
}
