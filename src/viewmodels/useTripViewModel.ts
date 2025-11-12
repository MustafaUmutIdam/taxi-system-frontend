import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService } from '../api/services/trip.service';
import type { CreateTripDTO } from '../models/Trip';

// Basit toast fonksiyonu
const showToast = (title: string, description: string, type: 'success' | 'error' = 'success') => {
  console.log(`[${type.toUpperCase()}] ${title}: ${description}`);
};

export const useTripViewModel = (status?: string) => {
  const queryClient = useQueryClient();

  // Trip'leri getir
  const {
    data: trips,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['trips', status],
    queryFn: () => status ? tripService.getByStatus(status) : tripService.getAll(),
    refetchInterval: status === 'pending' || status === 'assigned' ? 5000 : undefined, // Pending ve assigned için otomatik güncelleme
  });

  // Yeni trip oluştur
  const createMutation = useMutation({
    mutationFn: (data: CreateTripDTO) => tripService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      showToast('Başarılı', 'Yolculuk oluşturuldu ve şoföre atandı', 'success');
    },
    onError: (error: any) => {
      console.error('Error creating trip:', error);
      showToast('Hata', error.message || 'Yolculuk oluşturulamadı', 'error');
    },
  });

  // İptal edilen trip'i yeniden gönder
  const resendMutation = useMutation({
    mutationFn: (id: string) => tripService.resend(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      showToast('Başarılı', 'Yolculuk yeniden gönderildi', 'success');
    },
    onError: (error: any) => {
      console.error('Error resending trip:', error);
      showToast('Hata', error.message || 'Yolculuk gönderilemedi', 'error');
    },
  });

  return {
    // Data
    trips: trips || [],
    isLoading,
    error,

    // Actions
    createTrip: createMutation.mutate,
    resendTrip: resendMutation.mutate,
    refetch,

    // Loading states
    isCreating: createMutation.isPending,
    isResending: resendMutation.isPending,
  };
};