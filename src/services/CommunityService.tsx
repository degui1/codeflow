import { request } from '@/api/api-client'

const CommunityService = {
  getTemplates: async () => {
    const res = await request('GET', '/community')

    return res.json()
  },
}

export default CommunityService
