'use client';

import React, { useEffect } from 'react';
import { useKitchen } from '@/lib/hooks/useKitchen';
import OrderCard from '@/components/cards/OrderCard';

const OrderContainer: React.FC = () => {
  const {
    orders,
    fetchOrders,
    updateOrderStatus,
    removeOrder,
    error,
    setError,
    loading
  } = useKitchen();

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded">
          {error} <button onClick={() => setError()} className="ml-2 text-sm underline">Tutup</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order, index) => {
          const orderNumber = parseInt(order.queue_code.replace(/\D/g, '')) || index + 1;
          return (
            <OrderCard
              key={order.queue_code}
              order={order}
              orderNumber={orderNumber}
              onUpdateStatus={updateOrderStatus}
              onRemoveOrder={removeOrder}
            />
          );
        })}
      </div>

      {!loading && orders.length === 0 && (
        <div className="text-center text-gray py-12">
          Tidak ada order dalam antrian.
        </div>
      )}
    </div>
  );
};

export default OrderContainer;
