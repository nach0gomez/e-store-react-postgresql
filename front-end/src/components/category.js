import React from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '../fetcher'
import CategoryProduct from './categoryProduct'

const Category = ({ id, title, onCategoryClick }) => {
  const [products, setProducts] = React.useState({
    errorMessage: '',
    data: []
  })
  const { categoryId } = useParams()

  // get the categotyId from the URL and render the products with that specific categoryId
  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProducts(categoryId)
      setProducts(responseObject)
    }
    fetchData()
  }, [categoryId])

  // render the products when a category is clicked, depending on the catId
  const renderProducts = () => {
    return products.data.map(p =>
      // <Product key={c.id} id={c.id} title={c.id}/>
      <CategoryProduct key={p.id} {...p}>{p.title}</CategoryProduct>)
  }

  return (
    <main>
      <h1>Productos</h1>
      {products.errorMessage && <div>Error: {products.errorMessage}</div>}
      {products && renderProducts()}
    </main>
  )
}

export default Category
