export type User = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  role: string;
};

export type UpdateUserRequest = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  phone_number?: string;
};

export type WithToken = {
  token: string;
};
