import { create } from 'zustand'

type AuthStore = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  reset: () => void
}

export const authStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated(isAuthenticated: boolean) {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true')
      set({ isAuthenticated: true })
    } else {
      localStorage.setItem('isAuthenticated', 'false')
      set({ isAuthenticated: false })
    }
  },
  reset() {
    document.cookie = `oauth_code_verifier=; max-age=0; path=/`
    document.cookie = `oauth_state=; max-age=0; path=/`
    document.cookie = `session_cookie=; max-age=0; path=/`
    document.cookie = `user_session=; max-age=0; path=/`
  },
}))
