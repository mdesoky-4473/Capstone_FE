import { useState } from "react";
const BASE = import.meta.env.VITE_API_BASE;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      const res = await fetch(`${BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setMessage(data.message || "Login failed.");
      } else {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        setIsLoggedIn(true); 
      }
    } catch (err) {
      console.error(err);
      setMessage("Error occurred during login.");
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    //alert("Logged out!");
    setMessage("");
    setIsLoggedIn(false); 
  };
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div>
      <h2>Login</h2>

      {isLoggedIn ? (
        <>
          <p>You are logged in.</p>
          <button className ="primary-button" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <button className="primary-button" type="submit">Login</button>
        </form>
      )}

      <p>{message}</p>
    </div>
  );
}
