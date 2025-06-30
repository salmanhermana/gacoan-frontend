'use client';

import React, { useEffect } from 'react';
import WaiterOrderCard from '@/components/cards/WaiterCard';
import { useWaiter } from '@/lib/hooks/UseWaiter';

const WaiterContainer: React.FC = () => {
  const {
    orders,
    fetchOrders,
    finishServing,
    loading,
    error
  } = useWaiter();

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <WaiterOrderCard
            key={order.queue_code}
            queue_code={order.queue_code}
            orders={order.orders}
            tableNumber={order.table.table_number}
            onFinishServing={finishServing}
            isLoading={loading}
          />
        ))}
      </div>

      {!loading && orders.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          Tidak ada pesanan yang siap diantar.
        </div>
      )}
    </div>
  );
};

export default WaiterContainer;
