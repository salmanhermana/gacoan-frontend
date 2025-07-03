import { Menu } from '@/types/Menu/menu';
import { QueueData } from '@/types/Order';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAuthHeader = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const kitchenApi = {
  async getAllMenu(): Promise<Menu[]> {
    const response = await fetch(`${API_BASE_URL}/menu`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) throw new Error('Failed to fetch menu');
    const data = await response.json();
    return data.data || [];
  },

  async getLowestQueueMenu(): Promise<{ data: QueueData; status: 'pending'; timestamp: string } | null> {
    const response = await fetch(`${API_BASE_URL}/api/transaction/queue/lowest`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch queue');
    }
    const data = await response.json();
    return {
      data: data.data,
      status: 'pending',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false }),
    };
  },

  async startCooking(queueCode: string): Promise<{ data: QueueData; status: 'cooking'; timestamp: string }> {
    const response = await fetch(`${API_BASE_URL}/api/transaction/start-cooking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ queue_code: queueCode }),
    });
    if (!response.ok) throw new Error('Failed to start cooking');
    const data = await response.json();
    return {
      data: data.data,
      status: 'cooking',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false }),
    };
  },

  async finishCooking(queueCode: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/transaction/finish-cooking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ queue_code: queueCode }),
    });
    if (!response.ok) throw new Error('Failed to finish cooking');
  },

  async changeMenuAvailability(menuId: string, isAvailable: boolean): Promise<{ menu_id: string; is_available: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/transaction/menu-availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        menu_id: menuId,
        is_available: isAvailable,
      }),
    });
    if (!response.ok) throw new Error('Failed to update menu availability');
    const data = await response.json();
    return data.data;
  },

  async updateMenuAvailability(menuId: string): Promise<Menu> {
    const response = await fetch(`${API_BASE_URL}/menu/${menuId}/availability`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) throw new Error('Failed to update menu availability');
    const data = await response.json();
    return data.data;
  },

  async getReadyToServeList(): Promise<QueueData[]> {
    const response = await fetch(`${API_BASE_URL}/api/transaction/orders`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) throw new Error('Failed to fetch ready orders');
    const data = await response.json();
    return data.data || [];
  },

  async finishServing(queueCode: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/transaction/orders/finish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ queue_code: queueCode }),
    });
    if (!response.ok) throw new Error('Failed to finish serving');
  },
};
