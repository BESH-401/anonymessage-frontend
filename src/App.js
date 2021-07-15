import "./App.css";
import Main from "./components/Main.js";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" src={logo} alt="logo"></img>
      </header>
      <Main />
    </div>
  );
}

export default App;
