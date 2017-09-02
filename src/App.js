import BookList from './BookList';
import { Link } from 'react-router-dom';
import React from 'react';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';

import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then( (books) => {
      console.log(books);
      this.setState({ books })
    });
  }

  changeShelf = (book, shelf) => {
    let books = this.state.books;
    // find the object in the books state and change its tyoe
    let obj = books.find( (currentBook) => currentBook.title === book.title );

    obj.shelf = shelf;
    this.setState({ books });
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks />
        )} />

        <Route exact path="/" render={() => (
          <BookList books={this.state.books} changeShelf={this.changeShelf}/>
        )} />
      </div>
    )
  }
}

export default BooksApp;
