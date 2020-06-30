import React, { useEffect, useState } from "react";
import axios from "../../axios-books";

import Books from "../../components/Books/Books";

const Saved = () => {
  const [loading, setLoading] = useState(false);
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("/books.json").then((books) => {
      const fetchedBooks = [];

      for (const key in books.data) {
        fetchedBooks.push(books.data[key]);
      }

      setMyBooks(fetchedBooks);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return <Books loadedBooks={myBooks} click={() => {}} rate />;
};

export default Saved;
