import React from 'react';

class Book extends React.Component {

  render() {
    let { title, authors, imageLinks } = this.props.book;
    const type = this.props.type;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={type ? type : "none"} onChange={(e) => this.props.onChangeShelf(this.props.book, e.target.value)}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors ? authors[0] : ''}</div>
      </div>
    );
  }
}

export default Book;
