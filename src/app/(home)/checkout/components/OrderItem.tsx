import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { CartItem } from "@/context/CartContext";

type Props = {
  order: CartItem;
  methods: any;
  onIncrement: (id: number | string) => void;
  onDecrement: (id: number | string) => void;
  onDelete: (id: number | string) => void;
};

export default function OrderItem({
  order,
  methods,
  onIncrement,
  onDecrement,
  onDelete,
}: Props) {

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-4">
        <Image
          src={order.imageUrl}
          alt={order.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-lg object-cover"
        />

        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between">
            <h3 className="font-medium">{order.name}</h3>
            <button
              onClick={() => onDelete(order.id)}
              className="text-gray-500 hover:bg-red-400 rounded-full p-1 transition duration-200 hover:text-white cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <p className="font-medium">Rp {order.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => onDecrement(order.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 cursor-pointer"
        >
          <Minus size={16} />
        </button>

        <span className="w-6 text-center">{order.quantity}</span>

        <button
          onClick={() => onIncrement(order.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 cursor-pointer"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
