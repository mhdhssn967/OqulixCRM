import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/HomePage"; // Your homepage
import Nav from "./components/Nav";

function App() {
  return (
    <>
    <Nav />
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
