import React, { createContext, useReducer } from 'react'
import { CartReducer } from './cartReducer'

export const CartContext = createContext()

const Storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

const initialState = { cartItems: Storage }

const CartContextProvider = ({ children }) => {
  // console.log('Context Provider Rendering')
  const [state, dispatch] = useReducer(CartReducer, initialState)

  const addProduct = payload => {
    dispatch({ type: 'ADD', payload })
  }

  const removeProduct = payload => {
    dispatch({ type: 'REMOVE', payload })
  }

  const increaseQuantity = payload => {
    dispatch({ type: 'INCQTY', payload })
  }

  const decreaseQuantity = payload => {
    dispatch({ type: 'DECQTY', payload })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR', payload: undefined })
  }

  const getItems = () => {
    return state.cartItems
  }

  const contextValues = {
    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getItems,
    ...state
  }

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
