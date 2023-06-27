import React, {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import Context from '../../Context/Context.js'

import BookDetails from '../BookDetails/BookDetails'

class Home extends Component {
  state = {
    newBook: {},
    bookName: '',
    bookDescription: '',
    book_total_pages: '',
    onAdd: true,
  }

  componentDidMount() {
    this.addingBook()
  }

  onChangeName = event => {
    this.setState({bookName: event.target.value})
  }

  onChangeDescription = event => {
    this.setState({bookDescription: event.target.value})
  }

  onChangePages = event => {
    this.setState({book_total_pages: event.target.value})
  }

  addingBook = () => {
    const {bookName, bookDescription, book_total_pages} = this.state

    const updatedBook = {
      book_id: uuidv4(),
      name: bookName,
      description: bookDescription,
      total_pages: book_total_pages,
    }
    this.setState({newBook: updatedBook})

    return updatedBook
  }

  onSubmitSuccess = event => {
    event.preventDefault()
  }

  renderNameField = () => {
    const {bookName} = this.state

    return (
      <div>
        <label className="input-label" htmlFor="name">
          Book Name
        </label>
        <input
          type="text"
          id="name"
          className="name-input-field"
          value={bookName}
          onChange={this.onChangeName}
          placeholder="Book Name"
        />
      </div>
    )
  }

  renderDescriptionField = () => {
    const {bookDescription} = this.state

    return (
      <div>
        <label className="input-label" htmlFor="description">
          Book Description
        </label>
        <input
          type="text"
          id="description"
          className="description-input-field"
          value={bookDescription}
          onChange={this.onChangeDescription}
          placeholder="Description"
        />
      </div>
    )
  }

  renderPagesField = () => {
    const {book_total_pages} = this.state

    return (
      <div>
        <label className="input-label" htmlFor="pages">
          Total Pages
        </label>
        <input
          type="text"
          id="pages"
          className="pages-input-field"
          value={book_total_pages}
          onChange={this.onChangePages}
          placeholder="Total Pages"
        />
      </div>
    )
  }

  render() {
    const {onAdd} = this.state
    return (
      <Context.Consumer>
        {value => {
          const {booksList, addBook} = value

          const onBookAdd = () => {
            const p = this.addingBook()
            console.log(p)
            const x = addBook(p)
            this.setState({
              bookName: '',
              bookDescription: '',
              book_total_pages: '',
            })
            return x
          }

          return (
            <div>
              <ul>
                {booksList.map(book => (
                  <BookDetails key={book.book_id} bookDetails={book} />
                ))}
              </ul>
              {onAdd ? (
                <form onSubmit={this.onSubmitSuccess}>
                  <div>{this.renderNameField()}</div>
                  <div>{this.renderDescriptionField()}</div>
                  <div>{this.renderPagesField()}</div>
                  <button type="submit" onClick={onBookAdd}>
                    Add
                  </button>
                </form>
              ) : (
                ''
              )}
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Home
