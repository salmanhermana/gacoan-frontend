"use client";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import IconButton from "@/components/buttons/IconButton";
import { useCart } from "@/context/CartContext";
import Button from "@/components/buttons/Button";
import { Menu } from "@/types/menu/menu";
import { formatIDR } from "@/app/utils/currencyUtils";

const MenuContent = ({ item }: { item: Menu }) => {
  const { addToCart, items, updateQuantity } = useCart();
  const [highlight, setHighlight] = useState(false);

  const cartItem = items.find((i) => i.id === item.id);
  const itemQuantity = cartItem?.quantity || 0;
  const isInCart = itemQuantity > 0;

  useEffect(() => {
    if (isInCart) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemQuantity, isInCart]);

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, "increment");
  };

  const handleDecrement = () => {
    updateQuantity(item.id, "decrement");
  };

  const stok = item.is_available;

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl shadow-sm overflow-hidden p-3">
      <img
        src={item.image_url ?? "/images/placeholder.png"}
        alt={item.name}
        className="w-full h-48 object-cover rounded-xl"
      />

      <div className="h-full flex flex-col gap-1 md:gap-3">
        <div className="h-full flex flex-col gap-1">
          <p className="text-lg font-semibold">{item.name}</p>
          <p className="text-sm font-regular h-full">{item.description}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
          <p className="text-red-main text-lg font-bold">{formatIDR(item.price)}</p>

          {isInCart ? (
            <div
              className={`quantity-control cart-controls-enter ${highlight ? "quantity-highlight" : ""} relative`}
            >
              <IconButton
                size="sm"
                icon={Minus}
                className="cursor-pointer quantity-btn decrement"
                onClick={handleDecrement}
                disabled={!stok}
              />

              <span className="quantity-value text-xl">{itemQuantity}</span>

              <IconButton
                size="sm"
                icon={Plus}
                className={`cursor-pointer quantity-btn increment ${!stok ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleIncrement}
                disabled={!stok}
              />
            </div>
          ) : (
            <Button
              size="base"
              className={`bg-[#243E80] hover:bg-[#243E80] border-none hover:shadow-[#243E80] transition-all duration-300 py-2 ${!stok ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={handleAddToCart}
              disabled={!stok}
            >
              {!stok ? "Habis" : "Tambah"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuContent;
