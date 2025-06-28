export interface Menu {
  id: string;
  name: string;
  is_available?: boolean;
}

export interface MenuAvailabilityRequest {
  menu_id: string;
  is_available: boolean;
}

export interface MenuAvailabilityResponse {
  status: string;
  message: string;
  data: {
    menu_id: string;
    is_available: boolean;
  };
}