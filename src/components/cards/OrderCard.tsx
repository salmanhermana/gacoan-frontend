'use client';

import React, { useState, useEffect } from 'react';
import { QueueData } from '@/types/Order';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

interface OrderCardProps {
  order: QueueData;
  orderNumber: number;
  status: 'pending' | 'cooking' | 'ready';
  timestamp?: string;
  onUpdateStatus: (queueCode: string, newStatus: 'cooking' | 'ready') => void;
  onRemoveOrder: (queueCode: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  orderNumber,
  status,
  timestamp,
  onUpdateStatus,
  onRemoveOrder
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState<'cooking' | 'ready' | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (status === 'ready') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onRemoveOrder(order.queue_code);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, onRemoveOrder, order.queue_code]);

  const handleStatusUpdate = (newStatus: 'cooking' | 'ready') => {
    setPendingAction(newStatus);
    setShowConfirmation(true);
  };

  const confirmStatusUpdate = () => {
    if (pendingAction) {
      onUpdateStatus(order.queue_code, pendingAction);
    }
    setShowConfirmation(false);
    setPendingAction(null);
  };

  const buttonClass = status === 'pending'
    ? 'bg-orange'
    : status === 'cooking'
    ? 'bg-mediumspringgreen'
    : 'bg-gray-400';

  const buttonLabel = status === 'pending'
    ? 'Kerjakan Order'
    : status === 'cooking'
    ? 'Selesaikan Order'
    : 'Order Selesai';

  return (
    <>
      <div className="w-[548px] bg-white shadow-lg rounded-[11.62px] p-[17.4px] relative">
        <div className="flex justify-between mb-4">
          <div className="font-extrabold text-2xl">Order #{orderNumber}</div>
          <div className="text-gray text-lg font-semibold font-inter">{timestamp || '-'}</div>
        </div>
        <div className="space-y-1 text-gray font-inter mb-4">
          {order.orders.map((item, idx) => (
            <div key={idx} className="flex justify-between">
              <span className="font-semibold">{item.menu.name}</span>
              <span className="font-semibold">{item.quantity}x</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            if (status !== 'ready') {
              handleStatusUpdate(status === 'pending' ? 'cooking' : 'ready');
            }
          }}
          disabled={status === 'ready'}
          className={`w-full py-2 rounded font-poppins text-white ${buttonClass}`}
        >
          {buttonLabel}
        </button>
        {status === 'ready' && (
          <p className="text-sm text-center text-gray mt-2">Order akan hilang otomatis dalam {countdown} detik</p>
        )}
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setPendingAction(null);
        }}
        onConfirm={confirmStatusUpdate}
        title="Konfirmasi Action"
        message={`Apakah Anda yakin ingin ${pendingAction === 'cooking' ? 'memasak' : 'menyelesaikan'} Order #${orderNumber}?`}
      />
    </>
  );
};

export default OrderCard;