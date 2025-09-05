import { apiCall } from '@/api/api-client'

const CommunityService = {
  getTemplates: async () => {
    const res = await apiCall('GET', '/community')

    return res.json()
  },
}

export default CommunityService
