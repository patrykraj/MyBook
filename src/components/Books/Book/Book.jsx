import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../formElements/Button";
import DatePicker from "react-datepicker";
import LoadingSpinner from "../../UI/Loader/LoadingSpinner";

import classes from "./Book.module.css";
import "react-datepicker/dist/react-datepicker.css";

const Book = (props) => {
  const {
    book,
    click,
    searching,
    rate,
    loadingBookState,
    loadingUpdate,
    isAuthenticated,
  } = props;

  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleValue = (val) => {
    setTouched(true);
    setValue(val);
  };

  const handleUpdate = () => {
    setTouched(false);
    props.updateBook(book.query, value, startDate);
  };

  let selectedOption;
  switch (book.selectedOption) {
    case "1":
      selectedOption = "Want to buy.";
      break;
    case "2":
      selectedOption = `Book read on: ${book.dateRead}.`;
      break;
    default:
      selectedOption = "It's in your bookshelf.";
      break;
  }

  return (
    <li className={classes.BookListElement}>
      <div className={classes.BookInfoWrapper}>
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
          <p className={classes.BookDescriptionTitle}>
            {book.volumeInfo.title}
          </p>
          <p>
            {"\n Written by"}{" "}
            {book.volumeInfo.authors && book.volumeInfo.authors.join(", ")}
          </p>
          <p>
            Published:{" "}
            {book.volumeInfo.publishedDate
              ? book.volumeInfo.publishedDate
              : "N/D"}
          </p>
          {rate && <p>{selectedOption}</p>}
          {rate && (
            <select
              defaultValue={book.selectedOption}
              onChange={(e) => handleValue(e.target.value)}
            >
              <option value={0}>I have it</option>
              <option value={1}>Want to buy</option>
              <option value={2}>Read</option>
            </select>
          )}
          {rate && touched && value === "2" && (
            <>
              <p>Set read date: </p>
              <DatePicker
                todayButton="Today"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                withPortal={window.matchMedia("(max-width: 400px)").matches}
              />
            </>
          )}
        </div>
      </div>
      {rate && (
        <div className={classes.ButtonsWrapper}>
          <Button delete click={() => props.click(book.query)}>
            Delete
          </Button>
          {touched ? <Button click={handleUpdate}>Save</Button> : <span></span>}
          {loadingUpdate && <LoadingSpinner padding />}
        </div>
      )}
      {searching && (
        <div className={classes.ButtonsWrapper}>
          {isAuthenticated ? (
            <Button click={() => click(book)} disabled={loadingBookState}>
              {loadingBookState ? <LoadingSpinner /> : "+ add"}
            </Button>
          ) : (
            <Link className={classes.Link} to="login">
              Login to add
            </Link>
          )}
        </div>
      )}
    </li>
  );
};

export default Book;
