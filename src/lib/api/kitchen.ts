import { Menu  } from '@/types/Menu/menu';
import { QueueData  } from '@/types/Order';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://178.128.123.116';

export const kitchenApi = {
  // existing endpoint
  async getAllMenu(): Promise<Menu[]> {
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

  // API contract endpoint
    async getLowestQueueMenu(): Promise<QueueData | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/kitchen/queue/lowest`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch queue');
      }
      const data = await response.json();
      return data.data || null;
    } catch (error) {
      console.error('Error fetching lowest queue:', error);
      throw error;
    }
  },

    // API contract endpoint
  async startCooking(queueCode: string): Promise<QueueData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/kitchen/start-cooking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queue_code: queueCode }),
      });
      if (!response.ok) throw new Error('Failed to start cooking');
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error starting cooking:', error);
      throw error;
    }
  },

  // API contract endpoint
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

  // API contract endpoint
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

  // endpoint
  async updateMenuAvailability(menuId: string): Promise<Menu> {
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