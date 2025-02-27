import { useState, useEffect } from 'react'

const useFetchProducts = (fetchFunction) => {
  const [products, setProducts] = useState([])
  const [LoadingFlag, setLoadingFlag] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingFlag(true)
      try {
        const response = await fetchFunction()
        const updatedProducts = response.map((product) => ({
          ...product,
          features: product.features.split(', ') // Convert String into Array
        }))
        setProducts(updatedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError(error)
      } finally {
        setLoadingFlag(false)
      }
    }

    fetchProducts()
  }, [fetchFunction])

  return { products, LoadingFlag, error }
}

export default useFetchProducts
