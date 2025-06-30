export interface MenuSummary {
  id: string;
  name: string;
}

export interface OrderItem {
  menu: MenuSummary;
  quantity: number;
}

export interface QueueData {
  queue_code: string;
  orders: OrderItem[];
}

// Untuk respons umum dari endpoint Get Lowest Queue dan Start Cooking
export interface QueueResponse {
  status: string;
  message: string;
  data: QueueData;
}

// Untuk respons dari Finish Cooking (data null)
export interface BasicResponse {
  status: string;
  message: string;
  data: null;
}

export interface QueueDataWaiter {
  queue_code: string;
  orders: OrderItem[];
  table: {
    id: string;
    table_number: string;
  };
}