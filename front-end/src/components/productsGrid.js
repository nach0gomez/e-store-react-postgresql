import React, { useEffect, useState } from 'react'
import CategoryProduct from './categoryProduct'
import '../styles/productsGrid.css'

// Animations
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'

const ProductsGrid = ({ fetchFunction }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchFunction()
      const updatedProducts = response.map((product) => ({
        ...product,
        features: product.features.split(', ') // Convertir string a array
      }))
      setProducts(updatedProducts)
    }

    fetchProducts()
  }, [fetchFunction])

  return (
    <div>
      <h1 className='products-title'>Products</h1>
      <div className='products-container'>
        {products.length > 0
          ? (
              products.map((product) => (
                <CategoryProduct key={product.id_product} idProduct={product.id_product} {...product} />
              ))
            )
          : (
            <div className='loading'>
              <p>Loading</p>
              <UseAnimations animation={loading} size={40} />
            </div>
            )}
      </div>
    </div>
  )
}

export default ProductsGrid
