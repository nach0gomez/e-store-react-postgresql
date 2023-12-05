import React from 'react'
import '../styles/cart.css'

const Cart = () => {
  return (
    <div className='cart-container'>
      <h2 className='cart-title'>Carrito</h2>
      <button className='cart-button'>Pagar</button>
      <div className='cart-table'>
        <div className='cart-header'>
          <h4>Artículo</h4>
          <h4>Cantidad</h4>
          <h4>Precio</h4>
        </div>
        
        <hr className='cart-header-line' />

        <div className='cart-header'>
          Carrito Productos
        </div>
        <hr className='cart-header-line' />

        <button className='cart-button'>Limpiar</button>
        <h2 className='cart-total'>Total: 0 COP</h2>
      </div>

    </div>
  )
}

export default Cart