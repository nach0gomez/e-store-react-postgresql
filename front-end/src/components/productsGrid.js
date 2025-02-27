import React from 'react'
import CategoryProduct from './categoryProduct'
import '../styles/productsGrid.css'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import useFetchProducts from '../hooks/useFetchProducts'

const ProductsGrid = ({ fetchFunction, params }) => {
  const { products, LoadingFlag } = useFetchProducts(fetchFunction, params)

  return (
    <div>
      <h1 className='products-title'>Products</h1>
      <div className='products-container'>
        {LoadingFlag
          ? (
            <div className='loading'>
              <p>Loading</p>
              <UseAnimations animation={loading} size={40} />
            </div>
            )
          : (
              products.map((product) => (
                <CategoryProduct key={product.id_product} idProduct={product.id_product} {...product} />
              ))
            )}
      </div>
    </div>
  )
}

export default ProductsGrid
