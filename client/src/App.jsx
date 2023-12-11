import "./App.css";
import Header from "../src/components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Bookcards from "./components/BookCards/Bookcards.jsx";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Bookcards />
      <Footer />
    </div>
  );
};

export default App;
