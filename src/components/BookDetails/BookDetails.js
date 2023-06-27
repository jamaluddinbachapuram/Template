import React from 'react'
import {Link} from 'react-router-dom'

const BookDetails = props => {
  const {bookDetails} = props
  const {book_id, name, total_pages} = bookDetails

  return (
    <div>
      <Link to={`/book/${book_id}`}>
        <h1>
          {name},{total_pages}
        </h1>
      </Link>
    </div>
  )
}

export default BookDetails
