import React from "react";

import Button from "../../formElements/Button";

import classes from "./Book.module.css";

const Book = (props) => {
  const { book, searching, click } = props;

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
        />
      </div>
      <div className={classes.BookDescriptionWrapper}>
        <p className={classes.BookDescriptionTitle}>{book.volumeInfo.title}</p>
        <p>
          {"\n Written by"}{" "}
          {book.volumeInfo.authors && book.volumeInfo.authors.join(", ")}
        </p>
        <p>Published: {book.volumeInfo.publishedDate}</p>
      </div>
      {searching && (
        <div>
          <Button click={() => click(book)}>+ add to my books</Button>
        </div>
      )}
    </li>
  );
};

export default Book;
