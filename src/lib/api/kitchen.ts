import { Menu } from '@/types/menu/menu';
import { QueueData, QueueDataWaiter } from '@/types/Order';
import { getAuthHeader } from '@/lib/auth/getAuthHeader';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const kitchenApi = {
  async getAllMenu(): Promise<Menu[]> {
    const response = await fetch(`${API_BASE_URL}/menu/`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) throw new Error('Failed to fetch menu');
    const data = await response.json();
    return data.data || [];
  },

  async changeMenuAvailability(menuId: string, isAvailable: boolean): Promise<Menu> {
    const response = await fetch(`${API_BASE_URL}/menu/${menuId}/availability`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ is_available: isAvailable }),
    });
    if (!response.ok) throw new Error('Failed to update menu availability');
    const data = await response.json();
    return data.data;
  },

  async getNextOrder(): Promise<QueueData | null> {
    const response = await fetch(`${API_BASE_URL}/transaction/next-order`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch order');
    }
    const data = await response.json();
    return data.data || null;
  },

  async startCooking(queueCode: string): Promise<QueueData> {
    const response = await fetch(`${API_BASE_URL}/transaction/start-cooking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ queue_code: queueCode }),
    });
    if (!response.ok) throw new Error('Failed to start cooking');
    const data = await response.json();
    return data.data;
  },

  async finishCooking(queueCode: string): Promise<QueueData> {
    const response = await fetch(`${API_BASE_URL}/transaction/finish-cooking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ queue_code: queueCode }),
    });
    if (!response.ok) throw new Error('Failed to finish cooking');
    const data = await response.json();
    return data.data;
  },

  async getReadyToServeList(): Promise<QueueDataWaiter[]> {
    const response = await fetch(`${API_BASE_URL}/transaction/ready-to-serve`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!response.ok) throw new Error('Failed to fetch ready-to-serve list');
    const data = await response.json();
    return data.data || [];
  },

  async finishServing(queueCode: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/transaction/finish-delivering`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ queue_code: queueCode }),
    });
    if (!response.ok) throw new Error('Failed to finish serving');
  },

  async startDelivering(queueCode: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/transaction/start-delivering`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ queue_code: queueCode }),
    });
    if (!response.ok) throw new Error('Failed to start delivering');
  },
};
