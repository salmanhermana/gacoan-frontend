export interface OrderItem {
  menu: {
    id: string;
    name: string;
  };
  quantity: number;
}

export interface Order {
  queue_code: string;
  orders: OrderItem[];
  status: 'pending' | 'cooking' | 'ready' | 'completed';
  timestamp: string;
  estimatedTime?: number;
}
