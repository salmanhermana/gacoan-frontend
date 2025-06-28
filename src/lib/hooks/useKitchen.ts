import { useState, useEffect, useCallback } from 'react';
import { kitchenApi } from '@/lib/api/kitchen';
import { QueueOrder, MenuAvailabilityRequest, OrderStatus } from '@/types';

export const useQueue = () => {
  const [currentQueue, setCurrentQueue] = useState<QueueOrder | null>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(OrderStatus.PENDING);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLowestQueue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await kitchenApi.getLowestQueueMenu();
      setCurrentQueue(response.data);
      setOrderStatus(OrderStatus.PENDING);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch queue');
      setCurrentQueue(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const startCooking = useCallback(async (queueCode: string) => {
    try {
      setLoading(true);
      setError(null);
      await kitchenApi.startCooking({ queue_code: queueCode });
      setOrderStatus(OrderStatus.COOKING);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start cooking');
    } finally {
      setLoading(false);
    }
  }, []);

  const finishCooking = useCallback(async (queueCode: string) => {
    try {
      setLoading(true);
      setError(null);
      await kitchenApi.finishCooking({ queue_code: queueCode });
      setOrderStatus(OrderStatus.READY);
      // Clear queue sekarang sebelum lanjut
      setTimeout(() => {
        setCurrentQueue(null);
        fetchLowestQueue(); // fetch next queue
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to finish cooking');
    } finally {
      setLoading(false);
    }
  }, [fetchLowestQueue]);

  useEffect(() => {
    fetchLowestQueue();
    // Setup polling buat update real-time 
    const interval = setInterval(fetchLowestQueue, 5000);
    return () => clearInterval(interval);
  }, [fetchLowestQueue]);

  return {
    currentQueue,
    orderStatus,
    loading,
    error,
    startCooking,
    finishCooking,
    refetch: fetchLowestQueue,
  };
};

export const useMenuAvailability = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleMenuAvailability = useCallback(async (menuId: string, isAvailable: boolean) => {
    try {
      setLoading(true);
      setError(null);
      const response = await kitchenApi.changeMenuAvailability({
        menu_id: menuId,
        is_available: isAvailable,
      });
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update menu availability');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    toggleMenuAvailability,
    loading,
    error,
  };
};