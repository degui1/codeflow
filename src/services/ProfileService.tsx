import { apiCall } from '@/api/api-client'

const ProfileService = {
  getUserData: async () => {
    const res = await apiCall('GET', '/me')

    return res.json()
  },

  getHistory: async () => {
    const res = await apiCall('GET', '/me/history')

    return res.json()
  },

  deleteAccount: async () => {
    const res = await apiCall('DELETE', `/me`)

    return res.json()
  },
}
export default ProfileService
