import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, VStack, HStack, Text, Heading, Button } from '@chakra-ui/react';

const OrderOnline = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);

  // Add new item from navigation state
  useEffect(() => {
    if (location.state?.item) {
      setCart(prev => {
        const existing = prev.find(i => i.id === location.state.item.id);
        if (existing) {
          existing.qty += location.state.item.qty;
          if (location.state.item.note) existing.note = location.state.item.note;
          return [...prev];
        } else {
          return [...prev, location.state.item];
        }
      });
    }
  }, [location.state]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      if (Array.isArray(saved) && saved.length > 0) setCart(saved);
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
    }
  }, []);

  // Keep localStorage in sync with cart state
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const removeItem = id => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const createOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty");
    const payload = {
      items: cart.map(i => ({ menu_item: i.id, quantity: i.qty, note: i.note })),
    };

    const makeRequest = async (accessToken) => {
      return await fetch("http://127.0.0.1:8000/api/orders/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(payload),
      });
    };

    let access = localStorage.getItem("access");
    if (!access) {
      alert("You must be logged in to create an order.");
      return;
    }

    let res = await makeRequest(access);

    // If token expired, try refreshing and retry once
    if (res.status === 401) {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        alert("Session expired. Please log in again.");
        return;
      }

      const refreshRes = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        localStorage.setItem("access", data.access);
        access = data.access;
        res = await makeRequest(access);
      } else {
        alert("Session expired. Please log in again.");
        return;
      }
    }

    if (res.ok) {
      alert("Order created!");
      setCart([]);
    } else {
      const err = await res.json().catch(() => ({}));
      console.error(err);
      alert("Failed to create order");
    }
  };

  return (
    <Box p="6" maxW="600px" mx="auto">
      <Heading mb="4">Your Order</Heading>

      {cart.length === 0 && <Text>Your cart is empty.</Text>}

      <VStack spacing="4" align="stretch">
        {cart.map(i => (
          <Box key={i.id} p="4" borderWidth="1px" borderRadius="lg">
            <HStack justifyContent="space-between">
              <Text fontWeight="bold">{i.name}</Text>
              <Text>${i.price.toFixed(2)}</Text>
            </HStack>

            {i.note && <Text fontSize="sm">Notes: {i.note}</Text>}

            <HStack mt="3" spacing="3">
              <Button size="sm" onClick={() => updateQty(i.id, i.qty - 1)}>-</Button>
              <Text>{i.qty}</Text>
              <Button size="sm" onClick={() => updateQty(i.id, i.qty + 1)}>+</Button>

              <Button size="sm" colorScheme="red" ml="auto" onClick={() => removeItem(i.id)}>Remove</Button>
            </HStack>

            <Text mt="2" fontWeight="bold">
              Subtotal: ${(i.price * i.qty).toFixed(2)}
            </Text>
          </Box>
        ))}
      </VStack>

      {cart.length > 0 && (
        <>
          <Heading mt="6">Total: ${total.toFixed(2)}</Heading>
          <Button mt="4" colorScheme="yellow" onClick={createOrder}>Create Order</Button>
        </>
      )}
    </Box>
  );
};

export default OrderOnline;
