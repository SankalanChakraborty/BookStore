const express = require("express");
const pool = require("./connection");
require("dotenv");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

//ROUTES

//Homepage
app.get("/", async (req, res) => {
  const allBooks = await pool.query("SELECT * FROM BOOKS");
  console.log(allBooks.rows);
  if (!allBooks.rows) {
    res.status(500).send("There was a problem in fetching the books...");
  } else {
    res.status(201).send(allBooks.rows);
  }
});

// ADD A NEW BOOK
app.post("/add", async (req, res) => {
  const { id, name, author } = req.body;
  if (!id || !name || !author) {
    res.status(400).send("All the fields are mandatory...");
  } else {
    await pool.query(
      "INSERT INTO BOOKS (ID, NAME, AUTHOR) VALUES ($1, $2, $3)",
      [id, name, author]
    );
    res.status(201).send("Book has been added successfully...");
  }
});

//BOOK DETAILS
app.get("/:bookID", async (req, res) => {
  const { bookID } = req.params;
  const result = await pool.query("SELECT * FROM BOOKS WHERE ID = $1", [
    bookID,
  ]);
  console.log(result.rows);
  res.status(201).json(result.rows);
});

//UPDATE A BOOK
app.put("/edit/:bookID", async (req, res) => {
  const { bookID } = req.params;
  const { name, author } = req.body;
  const result = await pool.query("SELECT * FROM BOOKS WHERE ID = $1", [
    bookID,
  ]);
  if (!result.rows) {
    res.status(404).send("Book not found!!!");
  } else {
    await pool.query("UPDATE BOOKS SET NAME = $1, AUTHOR = $2 WHERE ID = $3", [
      name,
      author,
      bookID,
    ]);
    res.status(201).send("Update Successful...");
  }
});

// DELETE A BOOK
app.delete("/delete/:bookID", async (req, res) => {
  console.log("Hitting delete route");
  const { bookID } = req.params;
  console.log(bookID);
  const result = await pool.query("SELECT * FROM BOOKS WHERE ID = $1", [
    bookID,
  ]);
  if (!result.rows) {
    res.status(404).send("This book is either not present or already deleted");
  } else {
    await pool.query("DELETE FROM BOOKS WHERE ID = $1", [bookID]);
    res.status(201).send("Book has been deleted successfully...");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});

pool.connect();
