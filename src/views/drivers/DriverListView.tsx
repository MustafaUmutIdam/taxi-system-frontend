import React, { useState } from 'react';
import { useStationViewModel } from '../../viewmodels/useStationViewModel';
import { useDriverViewModel } from '../../viewmodels/useDriverViewModel';
import StationDriverCard from '../../components/driver/StationDriverCard';
import DriverForm from '../../components/driver/DriverForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import type { Driver, CreateDriverDTO, UpdateDriverDTO } from '../../models/Driver';

const DriverListView: React.FC = () => {
  const { stations, isLoading: stationsLoading } = useStationViewModel();
  
  // 🆕 ViewModel'dan `updateDriver` ve `isUpdating`'i alıyoruz
  const { createDriver, updateDriver, deleteDriver, isCreating, isUpdating } = useDriverViewModel();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  // --- Handler Fonksiyonları ---

  const handleAddDriverClick = (stationId: string) => {
    setSelectedStationId(stationId);
    setIsAddDialogOpen(true);
  };

  const handleEditDriverClick = (driver: Driver) => {
    setEditingDriver(driver);
    setIsEditDialogOpen(true);
  };

  const handleCreateSubmit = (data: CreateDriverDTO) => {
    if (!selectedStationId) return;
    createDriver({ ...data, station: selectedStationId }, {
      onSuccess: () => setIsAddDialogOpen(false),
    });
  };

  const handleUpdateSubmit = (data: UpdateDriverDTO) => {
    if (!editingDriver) return;
    
    // 1. editingDriver.station'ın obje mi yoksa string mi olduğunu kontrol et
    // Bazen populate edilmiş olabilir ({_id: '...', name: '...'}), bazen sadece ID olabilir.
    // Her durumda bize sadece ID'si lazım.
    const stationId = typeof editingDriver.station === 'object' && editingDriver.station !== null
      ? (editingDriver.station as any)._id
      : editingDriver.station;

    // 2. Formdan gelen dataya station ID'sini ekleyerek yeni bir payload oluştur
    const payload = { ...data, station: stationId };
    
    // 3. ViewModel'dan gelen `updateDriver` fonksiyonunu yeni payload ile çağır
    updateDriver({ id: editingDriver._id, data: payload }, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        setEditingDriver(null);
      },
    });
  };

  const handleDeleteDriver = (driverId: string) => {
    if (window.confirm("Bu şoförü silmek istediğinizden emin misiniz?")) {
      deleteDriver(driverId);
    }
  };

  if (stationsLoading) {
    return <div className="flex items-center justify-center h-screen">Duraklar Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Şoför Yönetimi</h1>
      </div>

      <div className="space-y-4">
        {stations.map((station) => (
          <StationDriverCard
            key={station._id}
            station={station}
            onAddDriver={handleAddDriverClick}
            onEditDriver={handleEditDriverClick}
            onDeleteDriver={handleDeleteDriver}
          />
        ))}
      </div>

      {/* ŞOFÖR EKLEME DIALOG'U (Değişiklik yok) */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yeni Şoför Ekle</DialogTitle>
          </DialogHeader>
          <DriverForm 
            onSubmit={handleCreateSubmit} 
            isLoading={isCreating} 
            onCancel={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
      
      {/* ŞOFÖR DÜZENLEME DIALOG'U (Değişiklik yok, zaten doğru yapıdaydı) */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Şoför Bilgilerini Düzenle</DialogTitle>
          </DialogHeader>
          <DriverForm 
            onSubmit={handleUpdateSubmit} 
            isLoading={isUpdating} // Artık ViewModel'dan geliyor
            initialData={editingDriver}
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriverListView;