import React from 'react'
import { useParams } from 'react-router-dom'
import { getProductsByCategory } from '../api/productsApi'
import CategoryProduct from './categoryProduct'

import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'

const Category = () => {
  const [products, setProducts] = React.useState([])
  const { categoryId } = useParams()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const responseObject = await getProductsByCategory(categoryId)
        setProducts(responseObject)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchData()
  }, [categoryId])

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

export default Category
