import { useState, useCallback } from 'react';
import { kitchenApi } from '@/lib/api/kitchen';
import { Menu } from '@/types/Menu/menu';
import { QueueData } from '@/types/Order';

export const useKitchen = () => {
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [orders, setOrders] = useState<{
    data: QueueData | null;
    status: 'pending' | 'cooking' | 'ready';
    timestamp: string;
  }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const items: Menu[] = await kitchenApi.getAllMenu();
      setMenuItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch menu items');
      console.error('Error fetching menu items:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await kitchenApi.getLowestQueueMenu();
      if (response) {
        setOrders([
          {
            data: response,
            status: 'pending',
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      } else {
        setOrders([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleMenuAvailability = useCallback(async (menuId: string, isAvailable: boolean) => {
    try {
      const response = await kitchenApi.changeMenuAvailability(menuId, isAvailable);
      setMenuItems(prev =>
        prev.map(item =>
          item.id === response.menu_id ? { ...item, is_available: response.is_available } : item
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update menu availability');
      throw err;
    }
  }, []);

  const updateOrderStatus = useCallback(async (queueCode: string, newStatus: 'cooking' | 'ready') => {
    try {
      if (newStatus === 'cooking') {
        await kitchenApi.startCooking(queueCode);
      } else if (newStatus === 'ready') {
        await kitchenApi.finishCooking(queueCode);
      }

      setOrders(prev =>
        prev.map(order =>
          order.data?.queue_code === queueCode ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status');
      throw err;
    }
  }, []);

  const removeOrder = useCallback((queueCode: string) => {
    setOrders(prev => prev.filter(order => order.data?.queue_code !== queueCode));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    menuItems,
    orders,
    loading,
    error,
    fetchMenuItems,
    fetchOrders,
    toggleMenuAvailability,
    updateOrderStatus,
    removeOrder,
    setError: clearError
  };
};
