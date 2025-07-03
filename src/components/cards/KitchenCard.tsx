'use client';

import React, { useEffect, useState } from 'react';
import { KitchenOrder } from '@/types/Order';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import OrderActionButton from '@/components/buttons/OrderActionButton';

interface OrderCardProps {
  order: KitchenOrder;
  orderNumber: number;
  onUpdateStatus: (queueCode: string, newStatus: 'cooking' | 'ready') => void;
  onRemoveOrder: (queueCode: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  orderNumber,
  onUpdateStatus,
  onRemoveOrder,
}) => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [pendingAction, setPendingAction] = useState<'cooking' | 'ready' | null>(null);

  useEffect(() => {
    if (order.status === 'pending') {
      const timer = setInterval(() => {
        const now = new Date();
        const created = new Date(); // simulasi
        const diff = Math.floor((now.getTime() - created.getTime()) / 60000);
        setTimeElapsed(diff);
      }, 60000);

      return () => clearInterval(timer);
    }
  }, [order.status, onRemoveOrder, order.data.queue_code]);

  const handleStatusUpdate = (newStatus: 'cooking' | 'ready') => {
    setPendingAction(newStatus);
    onUpdateStatus(order.data.queue_code, newStatus);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-lg text-gray-800">
          Order #{orderNumber}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ClockIcon className="w-4 h-4" />
          <span>{timeElapsed} menit</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {order.data.orders.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{item.menu.name}</span>
            <span>x{item.quantity}</span>
          </div>
        ))}
      </div>

      <div>
        <OrderActionButton
          status={order.status}
          onStartCooking={() => handleStatusUpdate('cooking')}
          onFinishCooking={() => handleStatusUpdate('ready')}
          loading={pendingAction !== null && order.status !== pendingAction}
        />
      </div>
    </div>
  );
};

export default OrderCard;
