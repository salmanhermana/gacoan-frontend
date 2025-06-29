export type CheckoutItem = {
  menu_id: string;
  quantity: number;
};

export type MenuItem = {
  id: string;
  name: string;
  price: string;
};

export type OrderItem = {
  menu: MenuItem;
  quantity: number;
};

export type CheckoutRequest = {
  table_id: string;
  orders: CheckoutItem[];
};

export type OrderResponse = {
  status: boolean;
  message: string;
  data: {
    transaction_id: number;
    total_price: string;
    payment_link: string;
    orders: OrderItem[];
  };
  meta: null;
};

export type TransactionData = {
  id: string;
  queue_code: string;
  estimate_time: string;
  orders: MenuItem[];
  total_price: string;
  table: {
    id: string;
    table_number: string;
  };
  order_status: "pending" | "cooking" | "served" | "cancelled" | string;
  is_delayed: boolean;
};