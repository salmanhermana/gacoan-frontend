'use client';

import React, { useState, useEffect } from 'react';
import { OrderItem } from '@/types/Order';
import { Button } from '@/components/ui/button';

interface WaiterOrderCardProps {
  queue_code: string;
  orders: OrderItem[];
  tableNumber: string;
  onFinishServing: (queueCode: string) => void;
  isLoading?: boolean;
}

const WaiterOrderCard: React.FC<WaiterOrderCardProps> = ({
  queue_code,
  orders,
  tableNumber,
  onFinishServing,
  isLoading = false,
}) => {
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setTimestamp(now.toLocaleTimeString('id-ID', { hour12: false }));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Order #{queue_code}</h2>
        <span className="text-sm text-gray-500">Meja {tableNumber}</span>
      </div>

      <ul className="text-sm text-gray-700 space-y-1">
        {orders.map((item, index) => (
          <li key={index}>• {item.menu.name} x{item.quantity}</li>
        ))}
      </ul>

      <Button
        onClick={() => onFinishServing(queue_code)}
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        {isLoading ? 'Memproses...' : 'Antar ke Meja'}
      </Button>
    </div>
  );
};

export default WaiterOrderCard;