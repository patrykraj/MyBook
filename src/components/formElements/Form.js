import React, { useState } from "react";

const Form = (props) => {
  const [error, setError] = useState(false);
  const [searchedBook, setSearchedBook] = useState("");

  const handleSendRequest = (e) => {
    setError(false);
    e.preventDefault();
    const query = searchedBook.trim().split(" ").join("+");

    if (query.length < 2) {
      setError(true);
      return;
    }

    props.sendRequest(searchedBook);
    setSearchedBook("");
  };

  return (
    <form onSubmit={handleSendRequest}>
      <input
        type="text"
        placeholder="search"
        onChange={(e) => setSearchedBook(e.target.value)}
        value={searchedBook}
      />
      <button type="submit">KLIK</button>
      {error && !props.isLoading && (
        <span
          style={{
            color: "red",
          }}
        >
          Invalid data (min. 2 characters)
        </span>
      )}
    </form>
  );
};

export default Form;
