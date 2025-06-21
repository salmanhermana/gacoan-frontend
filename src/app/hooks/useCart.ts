import { CartItem } from "@/types/checkout/order";
import { useState } from "react";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Nasi Goreng Spesial",
      quantity: 2,
      price: 25000,
      imageUrl: "/images/BackgroundHero.png",
      note: "",
    },
    {
      id: 2,
      name: "Ayam Bakar",
      quantity: 1,
      price: 30000,
      imageUrl: "/images/BackgroundHero.png",
      note: "Tanpa sambal",
    },
  ]);

  const updateQuantity = (id: number | string, action: "increment" | "decrement") => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increment"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const removeFromCart = (id: number | string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateNote = (id: number | string, note: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const clearCart = () => setItems([]);

  return {
    items,
    updateQuantity,
    removeFromCart,
    updateNote,
    totalPrice,
    clearCart,
  };
}
