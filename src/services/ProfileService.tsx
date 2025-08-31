import { request } from '@/api/api-client'

const ProfileService = {
  getUserData: async () => {
    const res = await request('GET', '/me')

    return res.json()
  },

  getHistory: async () => {
    const res = await request('GET', '/me/history')

    return res.json()
  },

  deleteAccount: async () => {
    const res = await request('DELETE', `/me`)

    return res.json()
  },
}

export default ProfileService
