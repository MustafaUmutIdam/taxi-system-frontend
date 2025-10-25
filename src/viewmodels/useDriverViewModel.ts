import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { driverService } from '../api/services/driver.service';
import { toast } from '../components/ui/use-toast';

export const useDriverViewModel = (stationId?: string) => {
  const queryClient = useQueryClient();

  // Tüm şoförleri getir
  const {
    data: drivers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['drivers', stationId],
    queryFn: () => stationId 
      ? driverService.getByStation(stationId)
      : driverService.getAll(),
  });

  // Aktif şoförleri getir
  const {
    data: activeDrivers,
  } = useQuery({
    queryKey: ['drivers', 'active', stationId],
    queryFn: () => driverService.getActiveDrivers(stationId),
    refetchInterval: 10000, // 10 saniyede bir güncelle
  });

  // Yeni şoför oluştur
  const createMutation = useMutation({
    mutationFn: driverService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      toast({
        title: 'Başarılı',
        description: 'Şoför başarıyla eklendi',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Hata',
        description: error.message || 'Şoför eklenemedi',
        variant: 'destructive',
      });
    },
  });

  // Şoför durumunu güncelle
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: any }) =>
      driverService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      toast({
        title: 'Başarılı',
        description: 'Şoför durumu güncellendi',
      });
    },
  });

  // Şoför sil
  const deleteMutation = useMutation({
    mutationFn: driverService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      toast({
        title: 'Başarılı',
        description: 'Şoför silindi',
      });
    },
  });

  return {
    drivers: drivers || [],
    activeDrivers: activeDrivers || [],
    isLoading,
    error,
    createDriver: createMutation.mutate,
    updateDriverStatus: updateStatusMutation.mutate,
    deleteDriver: deleteMutation.mutate,
    isCreating: createMutation.isPending,
  };
};