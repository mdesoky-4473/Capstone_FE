import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home'; 
import SignUp from './pages/SignUp'; 
import Login from './pages/Login'; 
import Cart from './pages/Cart'; 


function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> 
          <Link to="/signup">Sign Up</Link> 
          <Link to="/login">Login</Link> 
          <Link to="/cart">Cart</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
