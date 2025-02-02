import React, { useEffect, useState } from 'react'
import CategoryProduct from './categoryProduct' // Adjust the path based on your file structure
import { getAllProducts } from '../fetcher'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts()

        if (!response.errorMessage) {
          // Assuming response.data is an array of products
          setProducts(response.data)
        } else {
          console.error('Error fetching all products:', response.errorMessage)
        }
      } catch (error) {
        console.error('Error fetching all products:', error.message)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Productos</h1>
      <div>
        {products.map((product) => (
          <CategoryProduct key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default Home
