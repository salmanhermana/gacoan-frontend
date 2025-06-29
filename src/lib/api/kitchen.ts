import { MenuItem } from '@/types/Menu';
import { Order } from '@/types/Order';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://178.128.123.116';

export const kitchenApi = {
  // Get all menu items (existing endpoint)
  async getAllMenu(): Promise<MenuItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/menu`);
      if (!response.ok) throw new Error('Failed to fetch menu');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching menu:', error);
      throw error;
    }
  },

  // Get lowest queue menu (API contract endpoint)
  async getLowestQueueMenu(): Promise<Order | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/kitchen/queue/lowest`);
      if (!response.ok) {
        if (response.status === 404) {
          // No orders in queue
          return null;
        }
        throw new Error('Failed to fetch queue');
      }
      const data = await response.json();
      return {
        queue_code: data.data.queue_code,
        orders: data.data.orders,
        status: 'pending',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false })
      };
    } catch (error) {
      console.error('Error fetching lowest queue:', error);
      throw error;
    }
  },

  // Start cooking (API contract endpoint)
  async startCooking(queueCode: string): Promise<Order> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/kitchen/start-cooking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queue_code: queueCode }),
      });
      if (!response.ok) throw new Error('Failed to start cooking');
      const data = await response.json();
      return {
        queue_code: data.data.queue_code,
        orders: data.data.orders,
        status: 'cooking',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false })
      };
    } catch (error) {
      console.error('Error starting cooking:', error);
      throw error;
    }
  },

  // Finish cooking (API contract endpoint)
  async finishCooking(queueCode: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/kitchen/finish-cooking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queue_code: queueCode }),
      });
      if (!response.ok) throw new Error('Failed to finish cooking');
    } catch (error) {
      console.error('Error finishing cooking:', error);
      throw error;
    }
  },

  // Change menu availability (API contract endpoint)
  async changeMenuAvailability(menuId: string, isAvailable: boolean): Promise<{ menu_id: string; is_available: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/kitchen/menu-availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          menu_id: menuId, 
          is_available: isAvailable 
        }),
      });
      if (!response.ok) throw new Error('Failed to update menu availability');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error changing menu availability:', error);
      throw error;
    }
  },

  // Update menu availability (existing endpoint - keep for backward compatibility)
  async updateMenuAvailability(menuId: string): Promise<MenuItem> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/menu/${menuId}/availability`, {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Failed to update menu availability');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error updating menu availability:', error);
      throw error;
    }
  }
};