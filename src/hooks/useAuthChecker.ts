import { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { request } from '@/api/api-client'
import { authStore } from '@/stores/authStore.ts'

import { useRouter } from './useRouter'

export const useAuth = () => {
  const { navigate } = useRouter()

  const { isAuthenticated, getIsAuthenticated, reset } = authStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      getIsAuthenticated: state.getIsAuthenticated,
      reset: state.reset,
    })),
  )

  const logout = useCallback(() => {
    request('DELETE', '/auth/logout')

    reset()
    navigate('HOME', { replace: true })
  }, [])

  return {
    isAuthenticated,
    getIsAuthenticated,
    logout,
  }
}
