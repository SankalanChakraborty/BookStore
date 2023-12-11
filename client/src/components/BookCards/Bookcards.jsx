import { useEffect, useState } from "react";
import Card from "../Cards/Card";
import thumbnail from "../../assets/RichDadPoorDad.jpg";

const Bookcards = () => {
  const [books, setBooks] = useState();
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
    <>
      {books?.map((book) => (
        <Card key={book.id}>
          <img className="book-thumbnail" src={thumbnail} alt="thumbnail" />
          <h2 className="book-title">{book.name}</h2>
          <h3 className="book-author">{book.author}</h3>
        </Card>
      ))}
      ;
    </>
  );
};

export default Bookcards;
