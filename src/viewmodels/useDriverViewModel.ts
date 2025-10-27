import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { driverService } from '../api/services/driver.service';
import type { CreateDriverDTO, UpdateDriverDTO } from '../models/Driver';

const toast = (opts: { title: string; description?: string; variant?: string }) => {
  const message = opts.description ? `${opts.title}: ${opts.description}` : opts.title;
  if (opts.variant === 'destructive') {
    console.error(message);
  } else {
    console.log(message);
  }
};

export const useDriverViewModel = (stationId?: string) => {
  const queryClient = useQueryClient();

  // İstasyon bazlı şoförleri getir (değişiklik yok)
  const {
    data: drivers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['drivers', stationId],
    // stationId varsa getByStation, yoksa getAll çağrılacak. stationId'nin undefined olması durumunu yönetiyoruz.
    queryFn: () => stationId ? driverService.getByStation(stationId) : driverService.getAll(),
    enabled: !!stationId, // Sadece stationId mevcut olduğunda bu sorguyu çalıştır.
  });

  // Yeni şoför oluştur (değişiklik yok)
  const createMutation = useMutation({
    mutationFn: (data: CreateDriverDTO) => driverService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      toast({ title: 'Başarılı', description: 'Şoför başarıyla eklendi' });
    },
    onError: (error: any) => { /*...*/ },
  });

  // 🆕 ŞOFÖR GÜNCELLEME MUTATION'I
  // updateStatusMutation'ı tam güncelleme yapacak şekilde değiştiriyoruz.
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDriverDTO }) =>
      driverService.update(id, data), // Frontend servisinideki update fonksiyonunu çağırır.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      toast({ title: 'Başarılı', description: 'Şoför bilgileri güncellendi.' });
    },
    onError: (error: any) => {
       toast({
        title: 'Hata',
        description: error.message || 'Şoför güncellenemedi',
        variant: 'destructive',
      });
    },
  });

  // Şoför sil (değişiklik yok)
  const deleteMutation = useMutation({
    mutationFn: (id: string) => driverService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      toast({ title: 'Başarılı', description: 'Şoför başarıyla silindi' });
    },
    onError: (error: any) => { /*...*/ },
  });

  return {
    drivers: drivers || [],
    isLoading,
    error,
    
    // Actions
    createDriver: createMutation.mutate,
    updateDriver: updateMutation.mutate, // 🆕 Değiştirildi
    deleteDriver: deleteMutation.mutate,
    
    // Loading states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending, // 🆕 Eklendi
  };
};