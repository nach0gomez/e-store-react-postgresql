import React from 'react'
import { useParams } from 'react-router-dom'
import { getProductsByCategory } from '../api/productsApi'
import CategoryProduct from './categoryProduct'

const Category = () => {
  const [products, setProducts] = React.useState([])
  const { categoryId } = useParams()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const responseObject = await getProductsByCategory(categoryId)
        console.log(responseObject) // Asegurarnos de que llegan los datos
        setProducts(responseObject)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchData()
  }, [categoryId])

  // Función para renderizar los productos correctamente
  const renderProducts = () => {
    return products.map((p) => (
      <CategoryProduct key={p.id_product} {...p} />
    ))
  }

  return (
    <main>
      <h1>Productos</h1>
      {products.length === 0 ? <p>No hay productos disponibles</p> : renderProducts()}
    </main>
  )
}

export default Category
