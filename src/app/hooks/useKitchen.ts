import { useCallback, useEffect, useState } from 'react';
import { kitchenApi } from '@/lib/api/kitchen';
import { QueueData } from '@/types/Order';
import useGetAllMenus from '@/app/hooks/useGetAllMenus';

interface KitchenOrder {
  data: QueueData;
  status: 'pending' | 'cooking' | 'ready';
  timestamp: string;
}

export const useKitchen = () => {
  const {
    data: menuItems = [],
    isLoading,
    isError,
    error,
    refetch: refetchMenus,
  } = useGetAllMenus();

  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

const fetchOrders = useCallback(async () => {
  try {
    const data = await kitchenApi.getNextOrder();

    console.log('🎯 Data dari API:', data);

  if (data?.queue_code && data?.orders && Array.isArray(data.orders) && data.orders.length > 0) {
    const kitchenOrder: KitchenOrder = {
      data,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    setOrders([kitchenOrder]);
  } else {
    console.warn('⚠️ Data order tidak valid:', data);
    setOrders([]);
  }
  } catch (err) {
    setInternalError(
      err instanceof Error ? err.message : 'Gagal mengambil order'
    );
    console.error('❌ Gagal fetch order:', err);
    setOrders([]);
  }
}, []);


  const toggleMenuAvailability = useCallback(
    async (menuId: string, isAvailable: boolean) => {
      try {
        await kitchenApi.changeMenuAvailability(menuId, isAvailable);
        await refetchMenus();
      } catch (err) {
        setInternalError(
          err instanceof Error ? err.message : 'Gagal memperbarui status menu'
        );
      }
    },
    [refetchMenus]
  );

  const updateOrderStatus = useCallback(
    async (queueCode: string, newStatus: 'cooking' | 'ready') => {
      try {
        let updatedOrder: QueueData | undefined;
        if (newStatus === 'cooking') {
          updatedOrder = await kitchenApi.startCooking(queueCode);
        } else {
          await kitchenApi.finishCooking(queueCode);
        }

        if (updatedOrder) {
          setOrders((prev) =>
            prev.map((order) =>
              order.data.queue_code === queueCode
                ? {
                    data: updatedOrder,
                    status: newStatus,
                    timestamp: new Date().toISOString(),
                  }
                : order
            )
          );
        }
      } catch (err) {
        setInternalError(
          err instanceof Error ? err.message : 'Gagal memperbarui status order'
        );
      }
    },
    []
  );

  const removeOrder = useCallback((queueCode: string) => {
    setOrders((prev) =>
      prev.filter((order) => order.data.queue_code !== queueCode)
    );
  }, []);

  const clearError = useCallback(() => setInternalError(null), []);

  return {
    menuItems,
    orders,
    loading: loading || isLoading,
    error: internalError || (isError ? String(error) : null),
    fetchOrders,
    toggleMenuAvailability,
    updateOrderStatus,
    removeOrder,
    setError: clearError,
    refetchMenus,
  };
};
