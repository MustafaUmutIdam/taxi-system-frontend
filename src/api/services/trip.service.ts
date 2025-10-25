import { api } from '../axios.config';
import type { Trip, CreateTripDTO } from '../../models/Trip';

export const tripService = {
  // Tüm yolculukları getir
  getAll: async (filters?: { 
    status?: string; 
    station?: string;
    driver?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Trip[]> => {
    const response = await api.get('/trips', { params: filters });
    return response.data;
  },

  // ID'ye göre yolculuk getir
  getById: async (id: string): Promise<Trip> => {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  // Yeni yolculuk oluştur
  create: async (data: CreateTripDTO): Promise<Trip> => {
    const response = await api.post('/trips', data);
    return response.data;
  },

  // Yolculuğu şoföre ata
  assignDriver: async (tripId: string, driverId: string): Promise<Trip> => {
    const response = await api.post(`/trips/${tripId}/assign`, { driverId });
    return response.data;
  },

  // Yolculuğu iptal et
  cancel: async (tripId: string, reason: string): Promise<Trip> => {
    const response = await api.post(`/trips/${tripId}/cancel`, { reason });
    return response.data;
  },

  // Mesafe ve ücret hesapla
  calculateFare: async (pickup: { lat: number; lng: number }, dropoff: { lat: number; lng: number }): Promise<{
    distance: number;
    estimatedFare: number;
    duration: number;
  }> => {
    const response = await api.post('/trips/calculate-fare', { pickup, dropoff });
    return response.data;
  },

  // Bekleyen yolculukları getir
  getPending: async (stationId?: string): Promise<Trip[]> => {
    const params = { status: 'pending', ...(stationId && { station: stationId }) };
    const response = await api.get('/trips', { params });
    return response.data;
  },

  // Aktif yolculukları getir
  getActive: async (stationId?: string): Promise<Trip[]> => {
    const params = { 
      status: 'accepted,in_progress', 
      ...(stationId && { station: stationId }) 
    };
    const response = await api.get('/trips', { params });
    return response.data;
  },

  // Tamamlanan yolculukları getir
  getCompleted: async (filters?: { 
    station?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Trip[]> => {
    const params = { status: 'completed', ...filters };
    const response = await api.get('/trips', { params });
    return response.data;
  },
};