import { useCallback, useState } from 'react';
import { kitchenApi } from '@/lib/api/kitchen';
import { QueueData } from '@/types/Order';
import useGetAllMenus from '@/app/hooks/useGetAllMenus';

interface KitchenItem {
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

  const [kitchen, setKitchen] = useState<KitchenItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const fetchKitchen = useCallback(async () => {
    try {
      const data = await kitchenApi.getNextOrder();

      console.log('🎯 Data dari API:', data);

      if (
        data?.queue_code &&
        data?.orders &&
        Array.isArray(data.orders) &&
        data.orders.length > 0
      ) {
        const kitchenItem: KitchenItem = {
          data,
          status: 'pending',
          timestamp: new Date().toISOString(),
        };
        setKitchen([kitchenItem]);
      } else {
        console.warn('⚠️ Data order tidak valid:', data);
        setKitchen([]);
      }
    } catch (err) {
      setInternalError(
        err instanceof Error ? err.message : 'Gagal mengambil order'
      );
      console.error('❌ Gagal fetch order:', err);
      setKitchen([]);
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

  const updateKitchenStatus = useCallback(
    async (queueCode: string, newStatus: 'cooking' | 'ready') => {
      try {
        let updatedData: QueueData | undefined;

        if (newStatus === 'cooking') {
          updatedData = await kitchenApi.startCooking(queueCode);
        } else {
          await kitchenApi.finishCooking(queueCode);
          const existing = kitchen.find(item => item.data.queue_code === queueCode);
          updatedData = existing?.data;
        }

        if (updatedData) {
          setKitchen(prev =>
            prev.map(item =>
              item.data.queue_code === queueCode
                ? {
                    data: updatedData!,
                    status: newStatus,
                    timestamp: new Date().toISOString(),
                  }
                : item
            )
          );
        }
      } catch (err) {
        setInternalError(
          err instanceof Error ? err.message : 'Gagal memperbarui status order'
        );
      }
    },
    [kitchen]
  );

  const removeKitchenItem = useCallback((queueCode: string) => {
    setKitchen(prev =>
      prev.filter(item => item.data.queue_code !== queueCode)
    );
  }, []);

  const clearError = useCallback(() => setInternalError(null), []);

  return {
    menuItems,
    kitchen,
    loading: loading || isLoading,
    error: internalError || (isError ? String(error) : null),
    fetchKitchen,
    toggleMenuAvailability,
    updateKitchenStatus,
    removeKitchenItem,
    setError: clearError,
    refetchMenus,
  };
};
