import Book from './Book'
import React from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
  state = {
    query: '',
    searchBooks: []
  }

  searchBooksByQuery = () => {
    BooksAPI.search(this.state.query, 10).then( (searchBooks) => {
      searchBooks = searchBooks.map( (book) => {
        const bookInShelf = this.props.books.find(b => b.id === book.id);
        if (bookInShelf) {
          book.shelf = bookInShelf.shelf;
        }
        return book;
      });
      this.setState({ searchBooks });
    });
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    if (query.length > 2) {
      this.searchBooksByQuery();
    }
  }

  clearQuery = () => {
    this.setState({ query: '' });
  }

  render () {
    let { query, searchBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={ (event) => this.updateQuery(event.target.value) }
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBooks.map( (book) => (
              <li key={book.id}>
                <Book onChangeShelf={this.props.changeShelf} book={book} type={book.shelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
