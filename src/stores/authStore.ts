import { create } from 'zustand'

const SESSION_COOKIE = 'session_cookie'

type AuthStore = {
  isAuthenticated: boolean
  getIsAuthenticated: () => Promise<boolean>
  reset: () => void
}

export const authStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  getIsAuthenticated: async () => {
    const cookie = await cookieStore.get({ name: SESSION_COOKIE })
    const isAuth = Boolean(cookie)

    set({ isAuthenticated: isAuth })

    return isAuth
  },
  reset() {
    set({ isAuthenticated: false })
  },
}))
