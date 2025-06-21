import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { CartItem } from "@/types/checkout/order";

type Props = {
  order: CartItem;
  methods: any;
  onIncrement: (id: number | string) => void;
  onDecrement: (id: number | string) => void;
  onDelete: (id: number | string) => void;
  onNoteChange: (id: number | string, note: string) => void;
};

export default function OrderItem({
  order,
  methods,
  onIncrement,
  onDecrement,
  onDelete,
  onNoteChange,
}: Props) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState(order.note || "");

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
    onNoteChange(order.id, e.target.value);
  };

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
              className="text-gray-500 hover:bg-red-400 rounded-full p-1 transition duration-200 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <p className="font-medium">Rp {order.price.toLocaleString()}</p>

          {order.note && !showNoteInput && (
            <div className="mt-1 flex gap-2">
              <p className="text-sm text-gray-500">Catatan: {order.note}</p>
              <button
                onClick={() => setShowNoteInput(true)}
                className="text-sm text-blue-500 hover:underline"
              >
                Ubah
              </button>
            </div>
          )}

          {showNoteInput ? (
            <div className="mt-2 flex flex-col gap-2">
              <textarea
                value={noteText}
                onChange={handleNoteChange}
                placeholder="Tambahkan catatan untuk pesanan ini..."
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                rows={2}
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setShowNoteInput(false)}
                  className="text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                  Simpan
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowNoteInput(true)}
              className="mt-1 w-fit text-sm text-blue-500 hover:underline"
            >
              {order.note ? "Ubah catatan" : "Tambah catatan"}
            </button>
          )}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => onDecrement(order.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          <Minus size={16} />
        </button>

        <span className="w-6 text-center">{order.quantity}</span>

        <button
          onClick={() => onIncrement(order.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
