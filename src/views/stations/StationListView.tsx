import * as React from "react"
import { Plus } from 'lucide-react';
import { useStationViewModel } from '../../viewmodels/useStationViewModel';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import StationCard from '../../components/station/StationCard';
import StationForm from '../../components/station/StationForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';

const StationListView: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { stations, isLoading, createStation, isCreating } = useStationViewModel();

  const handleCreateStation = async (data: any) => {
    createStation(data, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
    });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Duraklar</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Durak
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((station) => (
          <StationCard key={station._id} station={station} />
        ))}
      </div>

      {stations.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">Henüz durak eklenmemiş.</p>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Yeni Durak Ekle</DialogTitle>
          </DialogHeader>
          <StationForm onSubmit={handleCreateStation} isLoading={isCreating} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StationListView;