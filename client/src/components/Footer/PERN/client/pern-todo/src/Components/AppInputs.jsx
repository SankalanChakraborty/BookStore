import React, {useEffect, useState} from 'react';
import './AppInputs.css';
import TodoCard from './TodoCard';

const AppInputs = ({nightMode}) => {

    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState("");
    const body = {description};

    const submitForm = async(e)=>{
        e.preventDefault();
        setDescription("");
        const response = await fetch("http://localhost:8000/todos", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        console.log(response);
    }

    const getTodos = async()=>{
        const response = await fetch("http://localhost:8000/todos");
        const data = await response.json();
        setTodos(data);
    }

    useEffect(()=>{
        getTodos();
    }, [todos]);
  return (
    <>
        <form className="todo-app_actions" onSubmit={submitForm}>  
            <input type="text" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Enter todo..."/>
            <button className="btn-add" type="submit">Add</button>
        </form>
        <div className="todo-cards_section">
            {todos?.map(item=>{
                return <TodoCard key={item.todo_id} id={item.todo_id} description={item.description} nightMode={nightMode} todos={todos} setTodos={setTodos}/>
            })}
        </div>
    </>
  )
}

export default AppInputs;
