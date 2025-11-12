import { api } from '../axios.config';
import type { Trip, CreateTripDTO } from '../../models/Trip';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export const tripService = {
  // Yeni trip oluştur
  create: async (data: CreateTripDTO): Promise<Trip> => {
    const response = await api.post<any, ApiResponse<Trip>>('/trips', data);
    return response.data;
  },

  // Tüm trip'leri getir
  getAll: async (filters?: {
    status?: string;
    station?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Trip[]> => {
    const response = await api.get<any, ApiResponse<Trip[]>>('/trips', { 
      params: filters 
    });
    return response.data;
  },

  // ID'ye göre trip getir
  getById: async (id: string): Promise<Trip> => {
    const response = await api.get<any, ApiResponse<Trip>>(`/trips/${id}`);
    return response.data;
  },

  // İptal edilen trip'i yeniden gönder
  resend: async (id: string): Promise<Trip> => {
    const response = await api.post<any, ApiResponse<Trip>>(`/trips/${id}/resend`);
    return response.data;
  },

  // Status'e göre trip'leri getir
  getByStatus: async (status: string): Promise<Trip[]> => {
    return tripService.getAll({ status });
  },
};