import { useState, useEffect } from 'react'

const useFetchProducts = (fetchFunction, params = null) => {
  const [products, setProducts] = useState([])
  const [LoadingFlag, setLoadingFlag] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingFlag(true)
      //   console.log('params:', params)
      //   console.log('fetchFunction:', fetchFunction)
      try {
        // Verificamos si `params` es necesario o no
        const response = params ? await fetchFunction(params) : await fetchFunction()

        console.log(response)

        const formattedProducts = response.map((product) => ({
          ...product,
          features: product.features.split(', ') // Convert String into array of strings
        }))

        setProducts(formattedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError(error)
      } finally {
        setLoadingFlag(false)
      }
    }

    fetchProducts()
  }, [fetchFunction, params]) // If the params or the function changes, we fetch again

  return { products, LoadingFlag, error }
}

export default useFetchProducts
