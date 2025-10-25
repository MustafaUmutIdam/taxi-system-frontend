// ==================== src/viewmodels/useStationViewModel.ts ====================
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { stationService } from '../api/services/station.service';
import type { CreateStationDTO } from '../models/Station';

// Basit toast fonksiyonu
const showToast = (title: string, description: string, type: 'success' | 'error' = 'success') => {
  console.log(`[${type.toUpperCase()}] ${title}: ${description}`);
  // Tarayıcıda görsel bildirim (opsiyonel)
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body: description });
  }
};

export const useStationViewModel = () => {
  const queryClient = useQueryClient();

  // Tüm durakları getir
  const {
    data: stations,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['stations'],
    queryFn: () => stationService.getAll(),
  });

  // Yeni durak oluştur
  const createMutation = useMutation({
    mutationFn: (data: CreateStationDTO) => stationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
      showToast('Başarılı', 'Durak başarıyla oluşturuldu', 'success');
    },
    onError: (error: any) => {
      console.error('Error creating station:', error);
      showToast('Hata', error.message || 'Durak oluşturulamadı', 'error');
    },
  });

  // Durak güncelle
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateStationDTO> }) =>
      stationService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
      showToast('Başarılı', 'Durak başarıyla güncellendi', 'success');
    },
    onError: (error: any) => {
      console.error('Error updating station:', error);
      showToast('Hata', error.message || 'Durak güncellenemedi', 'error');
    },
  });

  // Durak sil
  const deleteMutation = useMutation({
    mutationFn: (id: string) => stationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stations'] });
      showToast('Başarılı', 'Durak başarıyla silindi', 'success');
    },
    onError: (error: any) => {
      console.error('Error deleting station:', error);
      showToast('Hata', error.message || 'Durak silinemedi', 'error');
    },
  });

  return {
    // Data
    stations: stations || [],
    isLoading,
    error,

    // Actions
    createStation: createMutation.mutate,
    updateStation: updateMutation.mutate,
    deleteStation: deleteMutation.mutate,
    refetch,

    // Loading states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};