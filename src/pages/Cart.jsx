import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setError("You must be logged in to view your cart.");
        return;
      }
  
      try {
        const res = await fetch("http://localhost:3000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to fetch cart");
        }
  
        const data = await res.json();
        setCart(data);
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchCart();
  }, []);
  

  return (
    <div>
      <h2>Your Cart</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {cart.length === 0 && !error && <p>Your cart is empty.</p>}
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            Product Name: {item.name} — Price: {item.price} — Quantity: {item.quantity}
          </li>
        ))}
      
      </ul>
    
    </div>
  );
}
