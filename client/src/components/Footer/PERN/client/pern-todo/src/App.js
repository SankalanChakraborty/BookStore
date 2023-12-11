import './App.css';
import AppInputs from './Components/AppInputs';
import { useState } from 'react';

function App() {
  const [nightMode, setNightMode] = useState(false);
  const toggleMode = ()=>{
    setNightMode(mode => !mode)
  }

  const themeStyle_container = {
    backgroundColor: nightMode ? "#141414" : "#FFDAB9"
  }

  const themeStyle_heading = {
    backgroundColor: nightMode ? "#242323" : "#f6c192",
    color: nightMode ? "#FFFFFF" : "#000000"
  }

  return (
    <div className="app-container">
      <div className="app-container_todo" style={themeStyle_container}>
        <h1 className="todo-app_heading" style={themeStyle_heading}>Todo App</h1>
        <div className="mode">
        {nightMode ? (<span><i className="fa-solid fa-moon" style={{color: "#FFF"}} onClick={toggleMode}/></span>):(<span><i className="fa-solid fa-sun" onClick={toggleMode}/></span>)}
        </div>
        <AppInputs nightMode={nightMode}/>
      </div>
    </div>
  );
}

export default App;
