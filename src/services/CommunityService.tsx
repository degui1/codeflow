import axios from 'axios'

const url = 'http://localhost:3000'

const CommunityService = {
  getTemplates: async () => {
    const res = await axios.get(`${url}/templates`)
    return res.data
  },

  deleteTemplate: async (id: string) => {
    return axios.delete(`${url}/templates/${id}`)
  },
}

export default CommunityService
