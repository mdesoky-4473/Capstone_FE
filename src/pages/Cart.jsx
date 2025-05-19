import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const BASE = import.meta.env.VITE_API_BASE;

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to view your cart.");
      return;
    }

    try {
      const res = await fetch(`${BASE}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      setCart(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE}/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove item");

      setMessage("Item removed.");
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE}/api/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) throw new Error("Failed to update quantity");

      setMessage("Quantity updated.");
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {cart.length === 0 && !error && <p>Your cart is empty.</p>}

      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            {item.name} — ${item.price} — Quantity:
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleUpdateQuantity(item.productId, Number(e.target.value))
              }
              style={{ width: "60px", margin: "0 10px" }}
            />
            <button className="primary-button" onClick={() => handleRemove(item.productId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
