import { api } from '../axios.config';
import type { Station, CreateStationDTO } from '../../models/Station';

export const stationService = {
  // Tüm durakları getir
  getAll: async (search?: string): Promise<Station[]> => {
    const params = search ? { search } : {};
    const response = await api.get('/stations', { params });
    return response.data;
  },

  // ID'ye göre durak getir
  getById: async (id: string): Promise<Station> => {
    const response = await api.get(`/stations/${id}`);
    return response.data;
  },

  // Yeni durak oluştur
  create: async (data: CreateStationDTO): Promise<Station> => {
    const response = await api.post('/stations', data);
    return response.data;
  },

  // Durak güncelle
  update: async (id: string, data: Partial<Station>): Promise<Station> => {
    const response = await api.put(`/stations/${id}`, data);
    return response.data;
  },

  // Durak sil
  delete: async (id: string): Promise<void> => {
    await api.delete(`/stations/${id}`);
  },

  // Yakındaki durakları bul
  getNearby: async (lat: number, lng: number, distance?: number): Promise<Station[]> => {
    const response = await api.get('/stations/nearby', {
      params: { lat, lng, distance }
    });
    return response.data;
  },
};