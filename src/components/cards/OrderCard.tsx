import React, { useState, useEffect } from 'react';
import { Order } from '@/types/Order';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

interface OrderCardProps {
  order: Order;
  orderNumber: number;
  onUpdateStatus: (queueCode: string, newStatus: 'cooking' | 'ready') => void;
  onRemoveOrder: (queueCode: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, orderNumber, onUpdateStatus, onRemoveOrder }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState<'cooking' | 'ready' | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (order.status === 'ready') {
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
  }, [order.status, onRemoveOrder, order.queue_code]);

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

  const getButtonStyle = () => {
    if (order.status === 'pending') return 'bg-orange';
    if (order.status === 'cooking') return 'bg-mediumspringgreen';
    return 'bg-gray-400';
  };

  const getButtonText = () => {
    if (order.status === 'pending') return 'Kerjakan Order';
    if (order.status === 'cooking') return 'Selesaikan Order';
    return 'Order Selesai';
  };

  return (
    <>
      <div className="w-[548px] shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] rounded-[11.62px] bg-white h-[475px] flex flex-col items-start justify-start py-[17.4px] px-[11.6px] box-border relative gap-[11.6px]">
        <div className="w-[525px] h-[66px] flex flex-row items-center justify-between gap-0 z-[0]">
          <div className="relative font-extrabold text-5xl font-manrope">Order #{orderNumber}</div>
          <div className="relative text-lg font-semibold font-inter text-gray">{order.timestamp}</div>
        </div>
        <div className="w-[524.8px] relative h-auto z-[1] text-lg text-gray font-inter flex-1">
          {order.orders.map((item, idx) => (
            <div key={idx} className="w-[524.8px] flex flex-col items-start justify-start gap-[5.8px] mb-[16.38px]">
              <div className="relative font-semibold z-[0]">{item.menu.name}</div>
              <div className="w-[19px] absolute top-[0px] right-[-0.1px] font-semibold inline-block z-[1]">{item.quantity}x</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            if (order.status !== 'ready') {
              handleStatusUpdate(order.status === 'pending' ? 'cooking' : 'ready');
            }
          }}
          disabled={order.status === 'ready'}
          className={`w-[524.8px] absolute bottom-[15px] left-[calc(50%_-_262.48px)] rounded flex flex-row items-center justify-center py-2 px-[22px] box-border z-[2] text-sm text-whitesmoke-100 font-poppins ${getButtonStyle()}`}
        >
          <div className="relative leading-6 font-semibold">{getButtonText()}</div>
        </button>
        {order.status === 'ready' && (
          <p className="text-sm text-center text-gray mt-2 absolute bottom-[-20px] left-0 right-0">
            Order akan hilang otomatis dalam {countdown} detik
          </p>
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
