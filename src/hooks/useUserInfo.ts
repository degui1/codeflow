import { request } from '@/api/api-client'
import { userSchema } from '@/schemas/UserSchema'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useUserInfo() {
  const query = useSuspenseQuery({
    queryKey: ['get-logged-user-information'],
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
    staleTime: Infinity,
  })

  return query
}
