import { authStore } from '@/stores/authStore.ts'
import { getCookie } from './useGetCookie'

const AuthChecker = () => {
  const authStoreInstance = authStore.getState()
  const token = getCookie('session_cookie')
  const location = window.location.pathname // ou useLocation() se você mover isso pra um hook React
  const isOnLoginPage = location === '/'

  if (token) {
    authStoreInstance.setIsAuthenticated(true)
  } else {
    authStoreInstance.setIsAuthenticated(false)
    if (!isOnLoginPage) {
      window.location.href = '/'
    }
  }
}

const logout = () => {
  const authStoreInstance = authStore.getState()
  authStoreInstance.reset()
  window.location.href = '/'
}

export const useAuthChecker = () => ({ AuthChecker, logout })
