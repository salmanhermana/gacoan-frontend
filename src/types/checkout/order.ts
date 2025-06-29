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