'use client';

import { OrderStatus } from '@/types';

interface OrderActionButtonProps {
  status: OrderStatus;
  onStartCooking: () => void;
  onFinishCooking: () => void;
  loading: boolean;
}

const OrderActionButton: React.FC<OrderActionButtonProps> = ({
  status,
  onStartCooking,
  onFinishCooking,
  loading,
}) => {
  const getButtonConfig = () => {
    switch (status) {
      case OrderStatus.PENDING:
        return {
          text: 'Kerjakan Order',
          onClick: onStartCooking,
          className: 'bg-orange-500 hover:bg-orange-600 text-white',
        };
      case OrderStatus.COOKING:
        return {
          text: 'Selesaikan Order',
          onClick: onFinishCooking,
          className: 'bg-green-500 hover:bg-green-600 text-white',
        };
      case OrderStatus.READY:
        return {
          text: 'Order Selesai!',
          onClick: () => {},
          className: 'bg-gray-500 text-white cursor-not-allowed',
        };
    }
  };

  const { text, onClick, className } = getButtonConfig();

  return (
    <button
      onClick={onClick}
      disabled={loading || status === OrderStatus.READY}
      className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${className} ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Processing...' : text}
    </button>
  );
};

export default OrderActionButton;