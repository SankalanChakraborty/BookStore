import "./App.css";
import { useState, useEffect } from "react";
import Header from "../src/components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Bookcards from "./components/BookCards/Bookcards.jsx";
import BooksCtx from "./components/Store/Context.js";

const App = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const allBooks = getBooks();
    allBooks.then((data) => setBooks(data));
  }, []);

  const getBooks = async () => {
    const response = await fetch("http://localhost:8000", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  };
  return (
    <div className="app">
      <BooksCtx.Provider value={{ books, filteredList, setFilteredList }}>
        <Header />
        <Bookcards />
      </BooksCtx.Provider>
      <Footer />
    </div>
  );
};

export default App;
