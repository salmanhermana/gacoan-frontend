import { useCallback, useEffect, useState } from 'react';
import { kitchenApi } from '@/lib/api/kitchen';
import { OrderItem, QueueData } from '@/types/Order';
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
    refetch: refetchMenus
  } = useGetAllMenus();

  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setInternalError(null);
      const response = await kitchenApi.getLowestQueueMenu();
      if (response) {
        setOrders([response]);
      } else {
        setOrders([]);
      }
    } catch (err) {
      setInternalError(err instanceof Error ? err.message : 'Gagal mengambil antrian');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleMenuAvailability = useCallback(async (menuId: string, isAvailable: boolean) => {
    try {
      await kitchenApi.changeMenuAvailability(menuId, isAvailable);
      await refetchMenus();
    } catch (err) {
      setInternalError(err instanceof Error ? err.message : 'Gagal memperbarui status menu');
    }
  }, [refetchMenus]);

  const updateOrderStatus = useCallback(async (queueCode: string, newStatus: 'cooking' | 'ready') => {
    try {
      let updated;
      if (newStatus === 'cooking') {
        updated = await kitchenApi.startCooking(queueCode);
      } else {
        await kitchenApi.finishCooking(queueCode);
        updated = undefined;
      }
      setOrders(prev =>
        prev.map(order =>
          order.data.queue_code === queueCode && updated
            ? updated
            : order
        ).filter(Boolean)
      );
    } catch (err) {
      setInternalError(err instanceof Error ? err.message : 'Gagal memperbarui status order');
    }
  }, []);

  const removeOrder = useCallback((queueCode: string) => {
    setOrders(prev => prev.filter(order => order.data.queue_code !== queueCode));
  }, []);

  const clearError = useCallback(() => setInternalError(null), []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setOrders([
        {
          data: {
            queue_code: 'ORD-001',
            orders: [
              { menu: { id: 'm1', name: 'Mie Gacoan' }, quantity: 2 },
              { menu: { id: 'm2', name: 'Teh Manis' }, quantity: 1 },
            ]
          },
          status: 'pending',
          timestamp: '12:00:00'
        }
      ]);
    }
  }, []);

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
    refetchMenus
  };
};
