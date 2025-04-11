import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/categoryProduct.css'
import { CartContext } from '../contexts/cartContext'

// icons
import UseAnimations from 'react-useanimations'
import visibility from 'react-useanimations/lib/visibility'
import plusToX from 'react-useanimations/lib/plusToX'

const CategoryProduct = ({ idProduct, title, image, price }) => {
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
            <button className='btn pointer' onClick={() => addProduct({ id: idProduct, title, price })}>
              <UseAnimations className='icon' animation={plusToX} speed={0} strokeColor='black' />
            </button>
            <button className='btn pointer' onClick={() => navigate(`products/${idProduct}`)}>
              <UseAnimations className='icon' animation={visibility} speed={0} strokeColor='black' />
            </button>
          </div>
        </div>
        <section>
          <div className='product-info'>
            <p className='title'> <Link to={`products/${idProduct}`}> {title} </Link> </p>
            <p className='price'>$ {price}</p>
          </div>
        </section>
      </article>
    </div>
  )
}

export default CategoryProduct
