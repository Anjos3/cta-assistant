import axios from 'axios'

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3000/api'

const apiService = {
  sendChatMessage: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/chat`, data)
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  },
}

export default apiService
