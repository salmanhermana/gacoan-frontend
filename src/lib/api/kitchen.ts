import { MenuAvailabilityRequest, MenuAvailabilityResponse, QueueResponse, CookingRequest, FinishCookingResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

export class KitchenApiService {
  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getLowestQueueMenu(): Promise<QueueResponse> {
    return this.makeRequest<QueueResponse>('/kitchen/queue/lowest');
  }

  async startCooking(request: CookingRequest): Promise<QueueResponse> {
    return this.makeRequest<QueueResponse>('/kitchen/queue/start', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async finishCooking(request: CookingRequest): Promise<FinishCookingResponse> {
    return this.makeRequest<FinishCookingResponse>('/kitchen/queue/finish', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async changeMenuAvailability(request: MenuAvailabilityRequest): Promise<MenuAvailabilityResponse> {
    return this.makeRequest<MenuAvailabilityResponse>('/kitchen/menu/availability', {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  }
}

export const kitchenApi = new KitchenApiService();