import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000 // Set timeout for requests
})

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error?.response?.data || { errorMessage: 'Something went wrong' })
  }
)

export default api
