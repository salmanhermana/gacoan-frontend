"use client";

import { Menu } from "@/types/menu/menu";
import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (
    item: Menu,
  ) => void;
  removeFromCart: (itemId: number | string) => void;
  updateQuantity: (
    itemId: number | string,
    type: "increment" | "decrement",
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (
    menu: Menu,
  ) => {
    setItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === menu.id,
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            id: menu.id,
            name: menu.name,
            price: Number(menu.price),
            quantity: 1,
            imageUrl: menu.image_url || "/images/BackgroundHero.png",
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId: number | string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (
    itemId: number | string,
    type: "increment" | "decrement",
  ) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity =
            type === "increment" ? item.quantity + 1 : item.quantity - 1;

          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity };
          }
          return { ...item, quantity: 0 };
        }
        return item;
      });

      if (type === "decrement") {
        return updatedItems.filter((item) => item.quantity > 0);
      }

      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
