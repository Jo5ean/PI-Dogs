import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Landing from "./components/Landing.jsx";
import Detail from "./components/Detail.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route excat path="/home/:id" element={<Detail/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
