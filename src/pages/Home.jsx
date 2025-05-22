import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE}/api/products`);
        const data = await response.json(); 
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in to add items to your cart.");
      return;
    }

    try {
      const res = await fetch(`${BASE}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      setMessage("Item added to cart!");
    } catch (err) {
      console.error(err);
      setMessage("Error adding item to cart.");
    }
  };

  return (
    <div>
    <h1>Sports Gear Products</h1>
    {message && <p style={{ color: "green" }}>{message}</p>}
    <ul style={{ listStyle: "none", padding: 0 }}>
      {products.map((item) => (
        <li key={item.id} className="product-row" style={{ marginBottom: "20px" }}>
          <img src={item.image_url} alt={item.name} style={{ width: "150px", height: "150px", objectFit: "cover", marginRight: "10px" }} />
          <div>
            <strong>{item.name}</strong> - ${item.price}
          </div>
          <button className="primary-button" onClick={() => handleAddToCart(item.id)}> Add to Cart </button>
        </li>
      ))}
    </ul>
  </div>
  
  );
}
