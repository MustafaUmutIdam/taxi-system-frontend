import { api } from '../axios.config';
import type { User, LoginDTO, RegisterDTO, AuthResponse } from '../../models/User';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const authService = {
  // Giriş yap
  login: async (credentials: LoginDTO): Promise<AuthResponse> => {
    const response = await api.post<any, ApiResponse<AuthResponse>>('/auth/login', credentials);
    
    // Token'ı localStorage'a kaydet
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },

  // Kayıt ol
  register: async (userData: RegisterDTO): Promise<AuthResponse> => {
    const response = await api.post<any, ApiResponse<AuthResponse>>('/auth/register', userData);
    
    // Token'ı localStorage'a kaydet
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },

  // Profil bilgisi
  getProfile: async (): Promise<User> => {
    const response = await api.get<any, ApiResponse<User>>('/auth/me');
    return response.data;
  },

  // Çıkış yap
  logout: () => {
    localStorage.removeItem('token');
  },

  // Token kontrol
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Token var mı?
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};