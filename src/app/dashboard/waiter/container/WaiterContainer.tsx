"use client";

import React, { useEffect } from "react";
import { useWaiter } from "@/app/hooks/UseWaiter";
import WaiterCard from "@/components/cards/WaiterCard";

const WaiterContainer: React.FC = () => {
  const {
    orders,
    fetchOrders,
    finishServing,
    startDelivering,
    loading,
    error,
    setError,
  } = useWaiter();

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStartDelivering = async (queueCode: string) => {
    try {
      await startDelivering(queueCode);
      fetchOrders();
    } catch (err) {
      setError("Gagal memulai pengantaran.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded">
          {error}{" "}
          <button onClick={() => setError(null)} className="ml-2 text-sm underline">
            Tutup
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => (
          <WaiterCard
            key={order.queue_code}
            order={order}
            onStartDelivering={handleStartDelivering}
            onFinishServing={finishServing}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default WaiterContainer;