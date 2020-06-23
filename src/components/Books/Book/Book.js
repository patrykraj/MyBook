import React from "react";

import classes from "./Book.module.css";

const Book = (props) => {
  const { book } = props;

  return (
    <li className={classes.BookListElement}>
      <div className={classes.BookImageWrapper}>
        <img
          src={
            book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : "http://siddallheatingandcooling.net/_imgstore/5/1360415/thumbnail/FSeY96wEdX_eY4XkBN2jfYnuY9A.png"
          }
          alt="cover"
        ></img>
      </div>
      <div>
        {book.volumeInfo.title},{"\n Written by "}
        {book.volumeInfo.authors}, {book.volumeInfo.publishedDate}
      </div>
      <div>
        <button>KLIK</button>
      </div>
    </li>
  );
};

export default Book;
