import React from 'react'

const Context = React.createContext({
  booksList: [],
  cartList: [],
  addBook: () => {},
  removeBook: () => {},
  addBookToCart: () => {},
  removeBookFromCart: () => {},
  removeAllCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default Context
