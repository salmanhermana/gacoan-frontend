export interface OrderItem {
  menu: {
    id: string;
    name: string;
  };
  quantity: number;
}

export interface QueueOrder {
  queue_code: string;
  orders: OrderItem[];
}

export interface QueueResponse {
  status: string;
  message: string;
  data: QueueOrder;
}

export interface CookingRequest {
  queue_code: string;
}

export interface FinishCookingResponse {
  status: string;
  message: string;
  data: null;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  COOKING = 'COOKING',
  READY = 'READY'
}