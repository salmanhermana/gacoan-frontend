export interface MenuSummary {
  id: string;
  name: string;
}

export interface OrderItem {
  menu: {
    id: string;
    name: string;
  };
  quantity: number;
}

export interface QueueData {
  queue_code: string;
  orders: OrderItem[];
}

export interface QueueDataWithStatus extends QueueData {
  status: 'pending' | 'cooking' | 'ready';
  timestamp: string;
}

export interface QueueDataWaiter {
  queue_code: string;
  orders: OrderItem[];
  table: {
    id: string;
    table_number: string;
  };
}

export interface QueueResponse {
  status: string;
  message: string;
  data: QueueData;
}

export interface BasicResponse {
  status: string;
  message: string;
  data: null;
}

export interface KitchenOrder {
  data: QueueData;
  status: 'pending' | 'cooking' | 'ready';
  timestamp: string;
}
