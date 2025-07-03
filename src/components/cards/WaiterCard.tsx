'use client';

import React, { useState } from 'react';
import { QueueDataWaiter } from '@/types/Order';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

interface WaiterCardProps {
  order: QueueDataWaiter;
  onStartDelivering: (queueCode: string) => Promise<void>;
  onFinishServing: (queueCode: string) => Promise<void>;
  loading: boolean;
}

const WaiterCard: React.FC<WaiterCardProps> = ({ order, onStartDelivering, onFinishServing, loading }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    onFinishServing(order.queue_code);
    setShowConfirm(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Antrian #{order.queue_code}
        </h2>
        <span className="text-sm font-medium text-gray-600">
          Meja {order.table.table_number}
        </span>
      </div>

      <ul className="mb-4 space-y-1">
        {order.orders.map((item, idx) => (
          <li key={idx} className="text-gray-700 text-sm">
            {item.menu.name} x {item.quantity}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setShowConfirm(true)}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold"
      >
        Antar ke Meja
      </button>

      <button
      onClick={() => onStartDelivering(order.queue_code)}
      disabled={loading}
      className="btn btn-outline-primary"
      >
        Mulai Antar
      </button>

      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title="Konfirmasi Pengantaran"
        message={`Apakah Anda yakin ingin mengantar pesanan ${order.queue_code} ke meja ${order.table.table_number}?`}
      />
    </div>
  );
};

export default WaiterCard;
