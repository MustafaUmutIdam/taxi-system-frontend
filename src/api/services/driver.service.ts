import { api } from '../axios.config';
import type { Driver, CreateDriverDTO } from '../../models/Driver';

export const driverService = {
  // Tüm şoförleri getir
  getAll: async (filters?: { station?: string; status?: string }): Promise<Driver[]> => {
    const response = await api.get('/drivers', { params: filters });
    return response.data;
  },

  // ID'ye göre şoför getir
  getById: async (id: string): Promise<Driver> => {
    const response = await api.get(`/drivers/${id}`);
    return response.data;
  },

  // Durağa göre şoförleri getir
  getByStation: async (stationId: string): Promise<Driver[]> => {
    const response = await api.get(`/drivers/station/${stationId}`);
    return response.data;
  },

  // Yeni şoför oluştur
  create: async (data: CreateDriverDTO): Promise<Driver> => {
    const response = await api.post('/drivers', data);
    return response.data;
  },

  // Şoför güncelle
  update: async (id: string, data: Partial<Driver>): Promise<Driver> => {
    const response = await api.put(`/drivers/${id}`, data);
    return response.data;
  },

  // Şoför durumunu güncelle
  updateStatus: async (id: string, status: Driver['status']): Promise<Driver> => {
    const response = await api.patch(`/drivers/${id}/status`, { status });
    return response.data;
  },

  // Şoför sil
  delete: async (id: string): Promise<void> => {
    await api.delete(`/drivers/${id}`);
  },

  // Aktif şoförleri getir
  getActiveDrivers: async (stationId?: string): Promise<Driver[]> => {
    const params = stationId ? { station: stationId, status: 'active' } : { status: 'active' };
    const response = await api.get('/drivers', { params });
    return response.data;
  },
};