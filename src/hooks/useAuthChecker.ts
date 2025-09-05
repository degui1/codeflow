import { useEffect } from 'react'
import { authStore } from '@/stores/authStore.ts'
import { getCookie } from './useGetCookie'

export const AuthChecker = () => {
  const authStoreInstance = authStore((state) => state)
  const token = getCookie('session_cookie')

  useEffect(() => {
    if (token) {
      authStoreInstance.setIsAuthenticated(true)
    } else {
      authStoreInstance.setIsAuthenticated(false)
    }
  }, [token])

  return null
}

export const logout = () => {
  const authStoreInstance = authStore.getState()
  authStoreInstance.reset()
  window.location.href = '/'
}
