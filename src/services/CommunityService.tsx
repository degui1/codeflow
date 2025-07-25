import { apiCall } from '@/api/api-client'
import axios from 'axios'

const url = 'http://localhost:3000'

const CommunityService = {
  getTemplates: async () => {
    const res = await apiCall('GET', '/community')

    return res.json()
  },

  deleteTemplate: async (id: string) => {
    return axios.delete(`${url}/templates/${id}`)
  },
}

export default CommunityService
