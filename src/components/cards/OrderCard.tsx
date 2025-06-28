'use client';

import { QueueOrder, OrderStatus } from '@/types';
import OrderActionButton from '@/components/buttons/OrderActionButton';

interface OrderCardProps {
  order: QueueOrder;
  orderNumber: number;
  status: OrderStatus;
  timestamp: string;
  onStartCooking: (queueCode: string) => void;
  onFinishCooking: (queueCode: string) => void;
  loading: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  orderNumber,
  status,
  timestamp,
  onStartCooking,
  onFinishCooking,
  loading,
}) => {
  const totalItems = order.orders.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${
      status === OrderStatus.READY ? 'opacity-75 scale-95' : ''
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Order #{orderNumber}</h3>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
      
      <div className="space-y-2 mb-6">
        {order.orders.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700">{item.menu.name}</span>
            <span className="font-medium">{item.quantity}x</span>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500 mb-4">
        Total Items: {totalItems}
      </div>

      <OrderActionButton
        status={status}
        onStartCooking={() => onStartCooking(order.queue_code)}
        onFinishCooking={() => onFinishCooking(order.queue_code)}
        loading={loading}
      />
    </div>
  );
};

export default OrderCard;