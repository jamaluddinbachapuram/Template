import React from 'react'

import {Route} from 'react-router-dom'

import {Component} from 'react'

import {v4 as id} from 'uuid'

import Home from './components/Home/Home'

import Context from './Context/Context'

import './App.css'

import BookDetails from './components/BookDetails/BookDetails'

const books_list = [
  {
    book_id: id(),
    name: 'Apple',
    description: 'First Letter',
    total_pages: 20,
  },
  {
    book_id: id(),
    name: 'Bat',
    description: 'Second Letter',
    total_pages: 15,
  },
]

class App extends Component {
  state = {cartList: [], booksList: books_list}

  removeBookFromCart = id => {
    const {cartList} = this.state
    const newCartList = cartList.filter(item => item.id !== id)
    this.setState({cartList: newCartList})
  }

  addBookToCart = product => {
    const {id, quantity} = product
    const {cartList} = this.state
    const isTrue = cartList.filter(item => item.id === id)
    if (isTrue.length > 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + quantity}
          }
          return item
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  addBook = product => {
    const {booksList} = this.state
    this.setState({booksList: [...booksList, product]})
  }

  removeBook = id => {
    const {booksList} = this.state
    const newBookList = booksList.filter(item => item.id !== id)
    this.setState({booksList: newBookList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newCartList = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })
    this.setState({cartList: newCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.filter(item => item.id === id)
    const {quantity} = cartItem[0]
    if (quantity > 0) {
      const newCartList = cartList.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      })
      this.setState({cartList: newCartList})
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList, booksList} = this.state
    console.log(booksList)

    return (
      <Context.Provider
        value={{
          cartList,
          booksList,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          addBook: this.addBook,
          removeBook: this.removeBook,
          addBookToCart: this.addBookToCart,
          removeBookFromCart: this.removeBookFromCart,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Route>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/book/:id" element={<BookDetails />} />
        </Route>
      </Context.Provider>
    )
  }
}

export default App
