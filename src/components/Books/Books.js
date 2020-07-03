import React from "react";

import Book from "./Book/Book";

import classes from "./Books.module.css";

const Books = (props) => {
  return (
    <ul className={classes.BooksList}>
      {props.loadedBooks.length > 0 &&
        props.loadedBooks.map((book) => (
          <Book
            key={book.id}
            book={book}
            click={props.click}
            searching={props.search}
            rate={props.rate}
            loadingBookState={props.loadingBookState === book.id}
          />
        ))}
    </ul>
  );
};

export default Books;
