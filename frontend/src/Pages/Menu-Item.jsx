import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heading, Text, Button } from "@chakra-ui/react";

const MenuItem = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get item passed from previous page
  const passedItem = location.state?.item || null;

  const [item, setItem] = useState(passedItem);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  // Increment / decrement quantity
  const inc = () => setQty(q => q + 1);
  const dec = () => setQty(q => Math.max(1, q - 1));

  // Handle adding to cart
  const handleOrder = () => {
    if (!item) {
      alert("No item selected");
      return;
    }

    // Get existing cart
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Prepare new cart item
    const newItem = {
      id: item.id,
      name: item.name,
      price: Number(item.price),
      qty: Number(qty),
      note,
      image: item.image,
    };

    // Check if item is already in cart
    const existingIndex = cart.findIndex(i => i.id === item.id);
    if (existingIndex !== -1) {
      // Item exists -> increase quantity
      cart[existingIndex].qty += newItem.qty;
      if (note) cart[existingIndex].note = note; // update note if any
    } else {
      cart.push(newItem);
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Item added to cart!");
    navigate("/order-online"); // go to cart page
  };

  if (!item) return <p>No item selected.</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <img
        src={item.image.startsWith("http") ? item.image : `http://127.0.0.1:8000${item.image}`}
        alt={item.name}
        style={{ width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 8 }}
      />
      <Heading mt="4">{item.name}</Heading>
      <Text fontWeight="bold">${Number(item.price).toFixed(2)}</Text>
      <Text mt="2">{item.description}</Text>

      <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Button size="sm" onClick={dec}>-</Button>
        <input
          type="number"
          value={qty}
          min={1}
          onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))}
          style={{ width: 60, textAlign: "center" }}
        />
        <Button size="sm" onClick={inc}>+</Button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Notes:</label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={3}
          style={{ width: "100%", marginTop: "0.25rem", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Button colorScheme="yellow" onClick={handleOrder}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default MenuItem;

