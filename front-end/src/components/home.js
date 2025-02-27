import React from 'react'
import ProductsGrid from './productsGrid'
import { getProducts } from '../api/productsApi'

const Home = () => {
  return (
    <div>
      <ProductsGrid fetchFunction={getProducts} />
    </div>
  )
}

export default Home
