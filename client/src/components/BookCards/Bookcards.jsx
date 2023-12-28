import Card from "../Cards/Card";
import thumbnail from "../../assets/RichDadPoorDad.jpg";
import "./Bookcards.css";
import { useContext, useState } from "react";
import BooksCtx from "../Store/Context";
import { HiDotsVertical } from "react-icons/hi";

const Bookcards = () => {
  const { books, filteredList } = useContext(BooksCtx);
  const [click, setClick] = useState(false);

  const clickHandler = (e) => {
    console.log(e);
    console.log(e.target.nextSibling);
  };

  return (
    <>
      <div className="container">
        {filteredList.length > 0
          ? filteredList.map((book) => (
              <Card key={book.id}>
                <img
                  className="book-thumbnail"
                  src={thumbnail}
                  alt="thumbnail"
                />
                <HiDotsVertical className="action-btn" onClick={clickHandler} />
                <div className="options hidden">
                  <li>Edit</li>
                  <li>Delete</li>
                </div>
                <h2 className="book-title">{book.name}</h2>
                <h3 className="book-author">By {book.author}</h3>
              </Card>
            ))
          : books.map((book) => (
              <Card key={book.id}>
                <img
                  className="book-thumbnail"
                  src={thumbnail}
                  alt="thumbnail"
                />
                <HiDotsVertical className="action-btn" onClick={clickHandler} />
                <div className="options hidden">
                  <li>Edit</li>
                  <li>Delete</li>
                </div>
                <h2 className="book-title">{book.name}</h2>
                <h3 className="book-author">By {book.author}</h3>
              </Card>
            ))}
      </div>
    </>
  );
};

export default Bookcards;
