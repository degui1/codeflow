import { request } from '@/api/api-client'
import { userSchema } from '@/schemas/UserSchema'
import { useQuery } from '@tanstack/react-query'

// export const useUserInfo = () => {
//   const userInfo = (useLoaderData() as UserInfo) || undefined

//   return userInfo || null
// }
const fetchUserInfo = async () => {
  const response = await request('GET', '/user')
  const json = await response.json()
  if (json != undefined) {
    const { success, data, error } = userSchema.safeParse(json)
    console.log(json)
    if (error) {
      console.log(error)
    }
    if (!success) return undefined
    return data.response
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
