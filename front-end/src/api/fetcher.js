const BASE_URL = 'http://localhost:5000/api'

const fetcher = async (url) => {
  try {
    const response = await fetch(BASE_URL + url)
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    return { errorMessage: error.message, data: [] }
  }
}

export default fetcher
