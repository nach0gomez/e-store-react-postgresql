import React, { useEffect, useState } from 'react'
import CategoryProduct from './categoryProduct' // Adjust the path based on your file structure
import { getProducts } from '../api/productsApi'
import '../styles/home.css'

// animations
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'

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
      <div className='products-container'>
        {products.length > 0 && products.map((product) => (
          // make the prop camel case as it is received like id_product
          <CategoryProduct key={product.id_product} idProduct={product.id_product} {...product} />
        ))}
        {products.length === 0 &&
          <div className='loading'>
            <p>Loading</p>
            <UseAnimations animation={loading} size={40} />
          </div>}
      </div>
    </div>
  )
}

export default Home
