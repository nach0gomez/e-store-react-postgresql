import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/categoryProduct.css'
import { CartContext } from '../contexts/cartContext'

const CategoryProduct = ({ idProduct, title, image, specs, features, price, stock }) => {
  const navigate = useNavigate()
  const { addProduct } = useContext(CartContext)

  const handleClick = () => {
    navigate(`products/${idProduct}`)
  }

  return (
    <div className='product-container'>
      <article>
        <div className='product-image'>
          <img src={`/assets/${image}`} onClick={handleClick} alt={title} />
          <div className='buttons'>
            <button className='btn'>❤️</button>
            <button className='btn'>🛒</button>
            <button className='btn'>🔍</button>
          </div>
        </div>
        <section>
          <div className='product-info'>
            <p className='title'> <Link to={`products/${idProduct}`}> {title} </Link> </p>
            <p className='price'>{price} COP</p>
          </div>
        </section>
      </article>
    </div>
  )

  // return (
  //   <article>

  //       <div className='category-product-action'>
  //         <button className='clickeable'
  // onClick={() => navigate(`products/${id}`)}>
  // Ver Producto</button>

  //         <button className='clickeable'
  //  onClick={() => addProduct({ id, title, price })}>
  // Añadir a Carrito</button>
  //       </div>
  //     </aside>
  //   </article>
  // )
}

export default CategoryProduct
