import { useState, useCallback } from 'react';
import { kitchenApi } from '@/lib/api/kitchen';
import { MenuItem } from '@/types/Menu';
import { Order } from '@/types/Order';

export const useKitchen = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch menu items
  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await kitchenApi.getAllMenu();
      setMenuItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch menu items');
      console.error('Error fetching menu items:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch orders queue
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // simulasi fetch order
      const order = await kitchenApi.getLowestQueueMenu();
      setOrders(order ? [order] : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
      // jangan throw error, buat nunjukin mock data
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleMenuAvailability = useCallback(async (menuId: string, isAvailable: boolean) => {
    try {
      await kitchenApi.changeMenuAvailability(menuId, isAvailable);
      setMenuItems(prev => 
        prev.map(item => 
          item.id === menuId ? { ...item, isAvailable } : item
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
          order.queue_code === queueCode ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status');
      throw err;
    }
  }, []);

  const removeOrder = useCallback((queueCode: string) => {
    setOrders(prev => prev.filter(order => order.queue_code !== queueCode));
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