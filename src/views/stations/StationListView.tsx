import * as React from "react"
import { Plus } from 'lucide-react';
import { useStationViewModel } from '../../viewmodels/useStationViewModel';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import StationCard from '../../components/station/StationCard';
import StationForm from '../../components/station/StationForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import type { Station } from "@/models/Station"; // Station tipini import ediyoruz

const StationListView: React.FC = () => {
  // --- STATE YÖNETİMİ ---
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false); 
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [editingStation, setEditingStation] = React.useState<Station | null>(null);
  
  // --- VIEWMODEL BAĞLANTISI ---
  const { 
    stations, 
    isLoading, 
    createStation, 
    isCreating,
    updateStation, 
    deleteStation,
    isUpdating
  } = useStationViewModel();

  // --- HANDLER FONKSİYONLARI ---

  // Yeni durak oluşturma formunu gönderir
  const handleCreateStation = (data: any) => {
    createStation(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false); // Başarılı olunca "Oluşturma" dialog'unu kapat
      },
    });
  };

  // Düzenleme butonuna tıklandığında çalışır
  const handleEditClick = (station: Station) => {
    setEditingStation(station); // Hangi durağın düzenleneceğini state'e ata
    setIsEditDialogOpen(true);    // "Düzenleme" dialog'unu aç
  };

  // Düzenleme formunu gönderir
  const handleUpdateStation = (updatedData: any) => {
    if (!editingStation) return;

    updateStation({ id: editingStation._id, data: updatedData }, {
      onSuccess: () => {
        setIsEditDialogOpen(false);  // Başarılı olunca "Düzenleme" dialog'unu kapat
        setEditingStation(null);   // Düzenlenen durağı temizle
      },
    });
  };

  // Silme işlemini tetikler
  const handleDelete = (stationId: string) => {
    deleteStation(stationId);
  };

  // --- YÜKLENİYOR EKRANI ---
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  // --- RENDER ---
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Duraklar</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Durak
        </Button>
      </div>

      {/* Durak Kartlarının Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((station) => (
          <StationCard 
            key={station._id} 
            station={station} 
            // 2. Değişiklik: Doğru handler fonksiyonu bağlandı
            onEdit={handleEditClick} 
            onDelete={handleDelete}
          />
        ))}
      </div>

      {stations.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">Henüz durak eklenmemiş.</p>
        </Card>
      )}

      {/* YENİ DURAK EKLEME DIALOG'U */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Yeni Durak Ekle</DialogTitle>
          </DialogHeader>
          <StationForm onSubmit={handleCreateStation} isLoading={isCreating} onCancel={() => setIsCreateDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* 3. Değişiklik: EKSİK OLAN DÜZENLEME DIALOG'U EKLENDİ */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
              <DialogHeader>
                  <DialogTitle>Durağı Düzenle</DialogTitle>
              </DialogHeader>
              <StationForm 
                  onSubmit={handleUpdateStation} 
                  isLoading={isUpdating}
                  initialData={editingStation ?? undefined}
                  onCancel={() => setIsEditDialogOpen(false)}
              />
          </DialogContent>
      </Dialog>
    </div>
  );
};

export default StationListView;