import React from 'react'
import { getProductsByQuery } from '../api/productsApi'
import { useSearchParams } from 'react-router-dom'
import ProductsGrid from './productsGrid'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('s')
  console.log('query:', query)

  return (
    <ProductsGrid fetchFunction={getProductsByQuery} params={query} />
  )
}

export default SearchResults
