const Storage = (cartItems) => {
  window.localStorage.setItem('cart', JSON.stringify(cartItems))
}

export const CartReducer = (state, action) => {
  let index = -1

  if (action.payload) {
    index = state.cartItems.findIndex((x) => x.id === action.payload.id)
  }

  switch (action.type) {
    case 'ADD':
      if (index === -1) {
        const updatedCartItemsAdd = [...state.cartItems, { ...action.payload, quantity: 1 }]
        Storage(updatedCartItemsAdd)
        return {
          ...state,
          cartItems: updatedCartItemsAdd
        }
      } else {
        // Si el producto ya está en el carrito, simplemente aumenta la cantidad
        const updatedCartItemsIncQty = state.cartItems.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + 1 } : item
        )
        Storage(updatedCartItemsIncQty)
        return {
          ...state,
          cartItems: updatedCartItemsIncQty
        }
      }

    case 'INCQTY':
      if (index > -1) {
        const updatedCartItemsIncQty = state.cartItems.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + 1 } : item
        )
        Storage(updatedCartItemsIncQty)
        return {
          ...state,
          cartItems: updatedCartItemsIncQty
        }
      }
      return state

    case 'REMOVE':
      if (index > -1) {
        const updatedCartItemsRemove = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        )
        Storage(updatedCartItemsRemove)
        return {
          ...state,
          cartItems: updatedCartItemsRemove
        }
      }
      return state

    case 'DECQTY':
      if (index > -1) {
        const updatedCartItemsDecQty = state.cartItems.map((item, i) =>
          i === index ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )
        Storage(updatedCartItemsDecQty)
        return {
          ...state,
          cartItems: updatedCartItemsDecQty
        }
      }
      return state

    case 'CLEAR':
      Storage([])
      return {
        ...state,
        cartItems: []
      }

    default:
      return state
  }
}
