export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'admin' | 'station_manager' | 'operator';
  isActive: boolean;
  lastLogin?: string;
  profileImage?: string;
  managedStations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role?: 'station_manager' | 'operator';
}

export interface AuthResponse {
  user: User;
  token: string;
}