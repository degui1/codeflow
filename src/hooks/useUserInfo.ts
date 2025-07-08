import { useLoaderData } from 'react-router'

export const useUserInfo = () => {
  const userInfo = (useLoaderData() as UserInfo) || undefined

  return userInfo || null
}

export interface UserInfo {
  image: string
  username: string
  name: string
  email: string
  createdAt: string
}
