import Navbar from "./Components/Navbar";
import "./app.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
