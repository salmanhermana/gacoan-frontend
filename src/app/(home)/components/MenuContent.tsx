"use client";
import MenuContentSkeleton from "@/app/(home)/components/MenuContentSkeleton";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import IconButton from "@/components/buttons/IconButton";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
const MenuContent = ({ item }: { item: Product }) => {
  const [qty, setQty] = useState(0);

  const isLoading = false;

  if (isLoading) {
    return <MenuContentSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl shadow-sm overflow-hidden p-3">
      <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-xl" />

      <div className="flex flex-col gap-1 md:gap-3">
        <p className="text-lg font-semibold">{item.name}</p>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
          <p className="text-red-main text-lg font-bold">Rp{item.price.toLocaleString()}</p>
          <div className="flex items-center justify-between gap-3">
            <IconButton
              size="sm"
              icon={Minus}
              className="cursor-pointer"
              onClick={() => setQty((q) => Math.max(q - 1, 0))}
            />
            <span className="text-xl">{qty}</span>
            <IconButton
              size="sm"
              icon={Plus}
              className="cursor-pointer"
              onClick={() => setQty(qty + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuContent;
