import { request } from '@/api/api-client'
import { z } from 'zod'
import { create } from 'zustand'

const isAuthenticatedSchema = z.object({
  isAuthenticated: z.boolean().default(false),
})

type AuthStore = {
  isAuthenticated: boolean
  getIsAuthenticated: () => Promise<boolean>
  reset: () => void
}

export const authStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  getIsAuthenticated: async () => {
    try {
      const response = await request('POST', '/auth/session-verify')

      const { isAuthenticated } = isAuthenticatedSchema.parse(
        await response.json(),
      )

      set({ isAuthenticated })

      return isAuthenticated
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(error)
      }

      set({ isAuthenticated: false })
      return false
    }
  },
  reset() {
    set({ isAuthenticated: false })
  },
}))
