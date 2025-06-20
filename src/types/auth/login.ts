export type LoginRequest = {
    email: string;
    password: string;
  };
  
  export type LoginResponse = {
    data: {
      token: string;
      role: string;
    };
  };
  
  export type LoginError = {
    error: string;
    message: string;
  };
  