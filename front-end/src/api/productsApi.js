import api from './axiosInstance'

export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    return error
  }
}

export const getProductsById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    return error
  }
}

export const getProductsByCategory = async (id) => {
  try {
    const response = await api.get(`/categories/${id}/products`)
    return response.data
  } catch (error) {
    return error
  }
}

export const getProductsByQuery = async (query) => {
  try {
    const response = await api.get(`/products?q=${query}`)
    return response.data
  } catch (error) {
    return error
  }
}
