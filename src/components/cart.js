import React, { useContext } from 'react'
import '../styles/cart.css'
import { CartContext } from '../contexts/cartContext';
import { Link, useNavigate } from 'react-router-dom';


const Cart = () => {

  const navigate = useNavigate();
  const { getItems } = useContext(CartContext);

  const renderCart = () => {
    const cartItems = getItems();

    if (cartItems.length > 0) {
      return cartItems.map( (p) => (
        <React.Fragment key={p.id}>
          <div>
            <Link to={`/categories/3/products/${p.id}`}>{p.title}</Link>
          </div>
          <div className='cart-qty'>
            {p.quantity}
          </div>
          <div className='cart-price'>
            {p.price} COP
          </div>
        </React.Fragment>
      ));
    } else {
      return <div>El carrito esta vacío.</div>
    }
  }

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
          {renderCart()}
        </div>
        <hr className='cart-header-line' />

        <button className='cart-button'>Limpiar</button>
        <h2 className='cart-total'>Total: 0 COP</h2>
      </div>

    </div>
  )
}

export default Cart