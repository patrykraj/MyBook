import React, { useState } from "react";

import Button from "../../formElements/Button";
import DatePicker from "react-datepicker";

import classes from "./Book.module.css";
import "react-datepicker/dist/react-datepicker.css";

const Book = (props) => {
  const { book, click, searching, rate } = props;
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleValue = (val) => {
    setTouched(true);
    setValue(val);
  };

  let selectedOption;
  switch (book.selectedOption) {
    case "1":
      selectedOption = "Want to buy this book.";
      break;
    case "2":
      selectedOption = `Read this book on ${book.dateRead}.`;
      break;
    default:
      selectedOption = "It's in your bookshelf.";
      break;
  }

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
        <p>
          Published:{" "}
          {book.volumeInfo.publishedDate
            ? book.volumeInfo.publishedDate
            : "N/D"}
        </p>
        <p>{selectedOption}</p>
        {rate && touched && value === "2" && (
          <>
            <p>Set read date: </p>
            <DatePicker
              todayButton="Today"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </>
        )}
      </div>
      {searching && (
        <div>
          <Button click={() => click(book)}>+ add to my books</Button>
        </div>
      )}
      {rate && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Button delete click={() => props.click(book.query)}>
            Delete
          </Button>
          <select onChange={(e) => handleValue(e.target.value)}>
            <option value={0}>I have it</option>
            <option value={1}>Want to buy</option>
            <option value={2}>Read</option>
          </select>
          {touched ? <Button click={() => {}}>Save</Button> : <span></span>}
        </div>
      )}
    </li>
  );
};

export default Book;
