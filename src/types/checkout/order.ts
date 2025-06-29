export type CheckoutItem = {
  menu_id: string;
  quantity: number;
};

export type CheckoutRequest = {
  items: CheckoutItem[];
  notes: string;
};

export type OrderResponse = {
  status: boolean;
  message: string;
  data: {
    id: number;
    user_id: string;
    tenant_id: string;
    order_status: string;
    payment_status: string;
    notes: string;
    estimasi: null | string;
    antrian: null | number;
    payment_status_updated_at: string;
    order_status_updated_at: string;
    created_at: string;
    token: string;
    redirect_url: string;
  };
  meta: null;
};