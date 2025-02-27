import React from 'react'
import ProductsGrid from './productsGrid'
import { getProductsByCategory } from '../api/productsApi'
import { useParams } from 'react-router-dom'

const Category = () => {
  const { categoryId } = useParams()

  return (
    <div>
      <ProductsGrid fetchFunction={getProductsByCategory} params={categoryId} />
    </div>
  )
}

export default Category
