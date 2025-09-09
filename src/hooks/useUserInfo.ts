import { request } from '@/api/api-client'
import { userSchema } from '@/schemas/UserSchema'
import { useQuery } from '@tanstack/react-query'

const fetchUserInfo = async () => {
  const response = await request('GET', '/me')
  const json = await response.json()

  if (json != undefined) {
    const { success, data, error } = userSchema.safeParse(json)
    if (error) {
      // console.log(error)
    }
    if (!success) return undefined
    return data
  }
}

export function useUserInfo() {
  const query = useQuery({
    queryFn: fetchUserInfo,
    queryKey: ['user'],
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
