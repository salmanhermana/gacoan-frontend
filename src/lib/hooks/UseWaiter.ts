import { useCallback, useState } from 'react';
import { kitchenApi } from '@/lib/api/kitchen';
import { QueueData, QueueDataWaiter } from '@/types/Order';


export const useWaiter = () => {
  const [orders, setOrders] = useState<QueueDataWaiter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await kitchenApi.getReadyToServeList();
      setOrders(data as QueueDataWaiter[]);
    } catch (err: any) {
      setError(err.message || 'Gagal mengambil daftar pesanan.');
    } finally {
      setLoading(false);
    }
  }, []);

  const finishServing = useCallback(async (queueCode: string) => {
    try {
      setLoading(true);
      await kitchenApi.finishServing(queueCode);
      setOrders((prev) => prev.filter((o) => o.queue_code !== queueCode));
    } catch (err: any) {
      setError(err.message || 'Gagal memperbarui status pesanan.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    finishServing,
  };
};
