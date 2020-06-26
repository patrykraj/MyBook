import React, { useEffect, useState } from "react";
import axios from "../../axios-books";
import { fetchBooks } from "../../store/actions/actions";

const Saved = (props) => {
  const [myBooks, setMyBooks] = useState([]);

  // console.log(loadedBooks);

  useEffect(() => {
    axios.get("/books.json").then((books) => {
      const fetchedBooks = [];

      for (const key in books.data) {
        // console.log(books.data[key]);
        fetchedBooks.push(books.data[key]);
      }

      setMyBooks(fetchedBooks);
    });
  }, []);

  // const getBook = async (id) => {
  //   try {
  //     const res = await fetch(
  //       `https://www.googleapis.com/books/v1/volumes/${id}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // console.log(data);
  //         books.push(data);
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getBooks = async () => {
  //   const fetchedBooks = await axios.get("/books.json");

  //   const books = await Object.keys(fetchedBooks.data).map((bookId) => {
  //     console.log(fetchedBooks[bookId].id);
  //     console.log(bookId);
  //   });

  //   console.log(books.data);
  // };

  // useEffect(() => {
  //   getBooks();
  // }, []);

  // if (Object.keys(loadedBooks)) {
  //   for (const key in loadedBooks) {
  //     // console.log(key);
  //     getBook(loadedBooks[key].id);
  //   }
  //   setMyBooks(books);
  // }

  // console.log(myBooks);

  // const list = myBooks.map((book) => <h1>{book.volumeInfo.title}</h1>);

  // console.log(myBooks);

  // console.log(list);

  const list = myBooks.map((book) => (
    <h1 key={book.id}>{book.volumeInfo.title}</h1>
  ));

  return <div>{list}</div>;
};

export default Saved;
