import React, { useContext, useEffect, useState } from 'react'
import '../styles/cart.css'
import { CartContext } from '../contexts/cartContext'
import { Link, useNavigate } from 'react-router-dom'
import { PlusIcon, MinusIcon, TrashIcon } from './icons'

const Cart = () => {
  const navigate = useNavigate()
  const { getItems, clearCart, increaseQuantity, decreaseQuantity, removeProduct } = useContext(CartContext)

  // Use local state to manage cartItems for automatic updates
  const [cartItems, setCartItems] = useState(getItems())

  // Subscribe to changes in the CartContext
  useEffect(() => {
    setCartItems(getItems())
    // console.log('Cart Items Updated:', getItems);
  }, [getItems])

  // console.log('Cart Items:', cartItems)

  const renderCart = () => {
    if (cartItems.length > 0) {
      return cartItems.map((p) => (
        <React.Fragment key={p.id}>
          <div className='cart-product-title'>
            <Link to={`/categories/3/products/${p.id}`}>{p.title}</Link>
          </div>
          <div className='cart-qty'>
            {p.quantity}
            <PlusIcon className='cart-action' width={20} onClick={() => { increaseQuantity({ id: p.id }) }} />
            <MinusIcon className='cart-action' width={20} onClick={() => { decreaseQuantity({ id: p.id }) }} />
            <TrashIcon className='cart-action' width={20} onClick={() => { removeProduct({ id: p.id }) }} />
          </div>
          <div className='cart-price'>${p.price}</div>
        </React.Fragment>
      ))
    } else {
      return <div>Cart is empty.</div>
    }
  }

  const renderTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    return total
  }

  return (
    <div className='cart-container'>
      <h2 className='cart-title'>Cart</h2>

      <div className='cart-table'>
        <div className='cart-header'>
          <h3>Product</h3>
          <h3>Quantity</h3>
          <h3>Price</h3>
        </div>
        <hr className='cart-header-line' />
        <div className='cart-header'>{renderCart()}</div>
        <hr className='cart-header-line' />
      </div>
      <button className='cart-button' onClick={() => { clearCart() }}>
        Clear
      </button>
      <h2 className='cart-total'>Total: $ {renderTotal()}</h2>
      <button disabled={!(cartItems.length > 0)} className='cart-button' onClick={() => navigate('/checkout')}>
        Checkout
      </button>
    </div>
  )
}

export default Cart
