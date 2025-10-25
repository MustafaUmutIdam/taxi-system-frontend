import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService } from '../api/services/trip.service';
import { toast } from '../components/ui/use-toast';

export const useTripViewModel = (stationId?: string) => {
  const queryClient = useQueryClient();

  // Bekleyen yolculuklar
  const {
    data: pendingTrips,
    isLoading: isPendingLoading,
  } = useQuery({
    queryKey: ['trips', 'pending', stationId],
    queryFn: () => tripService.getPending(stationId),
    refetchInterval: 5000, // 5 saniyede bir güncelle
  });

  // Aktif yolculuklar
  const {
    data: activeTrips,
    isLoading: isActiveLoading,
  } = useQuery({
    queryKey: ['trips', 'active', stationId],
    queryFn: () => tripService.getActive(stationId),
    refetchInterval: 10000,
  });

  // Tamamlanan yolculuklar
  const {
    data: completedTrips,
    isLoading: isCompletedLoading,
  } = useQuery({
    queryKey: ['trips', 'completed', stationId],
    queryFn: () => tripService.getCompleted({ station: stationId }),
  });

  // Yeni yolculuk oluştur
  const createMutation = useMutation({
    mutationFn: tripService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast({
        title: 'Başarılı',
        description: 'Yolculuk talebi oluşturuldu',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Hata',
        description: error.message || 'Yolculuk oluşturulamadı',
        variant: 'destructive',
      });
    },
  });

  // Şoför ata
  const assignDriverMutation = useMutation({
    mutationFn: ({ tripId, driverId }: { tripId: string; driverId: string }) =>
      tripService.assignDriver(tripId, driverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast({
        title: 'Başarılı',
        description: 'Şoför atandı',
      });
    },
  });

  // Yolculuğu iptal et
  const cancelMutation = useMutation({
    mutationFn: ({ tripId, reason }: { tripId: string; reason: string }) =>
      tripService.cancel(tripId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast({
        title: 'Başarılı',
        description: 'Yolculuk iptal edildi',
      });
    },
  });

  // Mesafe ve ücret hesapla
  const calculateFareMutation = useMutation({
    mutationFn: tripService.calculateFare,
  });

  return {
    pendingTrips: pendingTrips || [],
    activeTrips: activeTrips || [],
    completedTrips: completedTrips || [],
    isPendingLoading,
    isActiveLoading,
    isCompletedLoading,
    createTrip: createMutation.mutate,
    assignDriver: assignDriverMutation.mutate,
    cancelTrip: cancelMutation.mutate,
    calculateFare: calculateFareMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
};