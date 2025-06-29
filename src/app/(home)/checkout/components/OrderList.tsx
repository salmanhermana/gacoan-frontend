import { CartItem } from "@/context/CartContext";
import OrderItem from "./OrderItem";
import Link from "next/link";

type Props = {
  orders: CartItem[];
  methods: any;
  onIncrement: (id: number | string) => void;
  onDecrement: (id: number | string) => void;
  onDelete: (id: number | string) => void;
};

export default function OrderList({
  orders,
  methods,
  onIncrement,
  onDecrement,
  onDelete,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-white p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Pesanan</h2>
        {orders.length > 0 && (
          <Link
            href="/"
            className="mt-1 w-fit text-sm text-blue-500 hover:underline"
          >
            Tambah Pesanan
          </Link>
        )}
      </div>

      {orders.map((order, index) => (
        <div key={order.id} className="flex flex-col gap-4">
          <OrderItem
            order={order}
            methods={methods}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
          />
          {index !== orders.length - 1 && <hr className="border" />}
        </div>
      ))}
    </div>
  );
}
