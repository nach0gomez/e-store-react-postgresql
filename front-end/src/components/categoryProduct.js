import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/categoryProduct.css'
import { CartContext } from '../contexts/cartContext'

const CategoryProduct = ({ id, title, image, specs, features, price, stock }) => {
  const navigate = useNavigate()
  // const { addProduct } = useContext(CartContext)

  return (
    <div className='product-container'>
      <article>
        <div className='product-image'>
          <img src={`/assets/${image}`} alt={title} />
        </div>
        <section>
          <div className='product-title'>
            <Link to={`products/${id}`}> {title} </Link>
          </div>
        </section>
      </article>
    </div>
  )

  // return (
  //   <article>
  //     <div className='category-product-title'>
  //       <Link to={`products/${id}`}> {title} </Link>
  //     </div>

  //     <figure>
  //       <div className='category-product-image-container'>
  //         <img src={`/assets/${image}`} alt={title} />
  //       </div>
  //     </figure>
  //     <aside>

  //       {specs.dimensions && (
  //         <div className='category-product-info-dimensions'>
  //           <h3>Dimensiones</h3>
  //           <label>{specs.dimensions}</label>
  //         </div>
  //       )}

  //       {specs.capacity && (
  //         <div className='category-product-info-capacity'>
  //           <h3>Capacidad</h3>
  //           <label>{specs.capacity}</label>
  //         </div>
  //       )}

  //       <div className='category-product-info-features'>
  //         <h3>Características</h3>
  //         <ul>
  //           {features?.map((f, i) => {
  //             return <li key={`feature${i}`}>{f}</li>
  //           })}
  //         </ul>
  //       </div>
  //     </aside>

  //     <aside className='category-product-finance'>
  //       <div className='category-product-finance-price'>
  //         {price} COP
  //       </div>

  //       <div className='category-product-info-stock'>
  //         <label>Unidades Disponibles: {stock}</label>
  //         <label>Envio GRATIS</label>
  //       </div>

  //       <div className='category-product-action'>
  //         <button className='clickeable' onClick={() => navigate(`products/${id}`)}>Ver Producto</button>
  //         <button className='clickeable' onClick={() => addProduct({ id, title, price })}>Añadir a Carrito</button>
  //       </div>
  //     </aside>
  //   </article>
  // )
}

export default CategoryProduct
