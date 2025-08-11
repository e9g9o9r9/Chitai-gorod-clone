export interface User {
  id: string;
  email: string;
  name: string;
}

export interface RegisterUserData {
  email: string;
  name: string;
  password: string;
  username?: string; 
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  name: string;
  token: string;
  expiresIn?: number; 
}

export interface AuthState {
  user: User | null;
  name?: string | null,
  token?: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface RegisterResponse {
  user: User;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
