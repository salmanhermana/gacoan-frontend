'use client';

import React, { useEffect } from 'react';
import OrderCard from '@/components/cards/KitchenCard';
import { useKitchen } from '@/app/hooks/useKitchen';

const KitchenContainer: React.FC = () => {
  const {
    kitchen = [],
    fetchKitchen,
    updateKitchenStatus,
    removeKitchenItem,
    error,
    setError,
    loading
  } = useKitchen();

  useEffect(() => {
    fetchKitchen();
    const interval = setInterval(fetchKitchen, 30000);
    return () => clearInterval(interval);
  }, [fetchKitchen]);

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded">
          {error}
          <button
            onClick={() => setError()}
            className="ml-2 text-sm underline"
          >
            Tutup
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-12">Memuat order...</div>
      ) : kitchen.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Tidak ada order dalam antrian.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {kitchen.map((item, index) => {
            const orderNumber =
              parseInt(item?.data?.queue_code?.replace(/\D/g, '')) || index + 1;

            return (
              <OrderCard
                key={item.data?.queue_code ?? `fallback-${index}`}
                order={item}
                orderNumber={orderNumber}
                onUpdateStatus={updateKitchenStatus}
                onRemoveOrder={removeKitchenItem}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KitchenContainer;
