import React from 'react'
import { getProductsByQuery } from '../fetcher'
import { useSearchParams } from 'react-router-dom'
import CategoryProduct from './categoryProduct'
// import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const [products, setProducts] = React.useState({
    errorMessage: '',
    data: []
  })

  const [searchParams] = useSearchParams()
  const query = searchParams.get('s')

  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductsByQuery(query)
      setProducts(responseObject)
    }
    fetchData()
  }, [query])

  const renderProducts = () => {
    if (products.data.length > 0) {
      return products.data.map(p =>
      // <Product key={c.id} id={c.id} title={c.id}/>
        <CategoryProduct key={p.id} {...p}>{p.title}</CategoryProduct>)
    } else {
      return <div><p>No hay resultados para la busqueda.</p></div>
    }
  }

  return (
    <main>
      <h1>Productos</h1>
      {products.errorMessage && <div>Error: {products.errorMessage}</div>}
      {renderProducts()}
    </main>
  )
}

export default SearchResults
