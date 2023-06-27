import React from 'react'
import Context from '../../Context/Context'

const Book = () => {
  const {match} = this.props
  const {params} = match
  const {id} = params
  return (
    <Context.Consumer>
      {value => {
        const {booksList} = value
        const requiredBook = booksList.filter(item => (item.id = id))
        console.log(requiredBook)
        return (
          <div>
            <h1>{requiredBook.name}</h1>
          </div>
        )
      }}
    </Context.Consumer>
  )
}

export default Book
