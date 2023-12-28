import "./Header.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import BooksCtx from "../Store/Context";

const Header = () => {
  const { books, setFilteredList } = useContext(BooksCtx);
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    setSearch(e.target.value);
    if (!e.target.value) {
      setFilteredList([...books]);
    } else {
      setFilteredList(
        books.filter((book) =>
          book.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };
  return (
    <>
      <div id="app-banner">
        <h1>BookWorm</h1>
        <div id="search">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={searchHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
