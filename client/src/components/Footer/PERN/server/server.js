const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const path = require("path");

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname + "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

//ROUTES

//Create a TODO (POST)
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO TODO (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo);
  } catch (error) {
    console.error(error);
  }
});

//GET all TODOS
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM TODO");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error);
  }
});

//GET a specific TODO
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getTodo = await pool.query("SELECT * FROM TODO WHERE todo_id = $1", [
      id,
    ]);
    res.json(getTodo.rows);
  } catch (error) {
    console.error(error);
  }
});

//UPDATE a TODO
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updateTodo = await pool.query(
      "UPDATE TODO SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("TODO updated");
  } catch (error) {
    console.error(error);
  }
});

//DELETE a TODO
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateTodo = await pool.query("DELETE FROM TODO WHERE todo_id = $1", [
      id,
    ]);
    res.json("TODO deleted");
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
