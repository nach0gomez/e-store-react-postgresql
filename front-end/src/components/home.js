import React, { useEffect, useState } from 'react'
import CategoryProduct from './categoryProduct' // Adjust the path based on your file structure
import { getProducts } from '../api/productsApi'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts()
      // Create a new variable to hold the fixed features
      const updatedProducts = response.map((product) => {
        return {
          ...product,
          features: product.features.split(', ') // Convert string to array
        }
      })
      setProducts(updatedProducts)
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map((product) => (
          <CategoryProduct key={product.id_product} {...product} />
        ))}
      </div>
    </div>
  )
}

export default Home
