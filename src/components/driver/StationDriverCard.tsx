import React, { useState } from 'react';
import { ChevronDown, Plus, Edit, Trash2, User, Phone, Car } from 'lucide-react';
import type { Station } from '../../models/Station';
import type { Driver } from '../../models/Driver';
import { useDriverViewModel } from '../../viewmodels/useDriverViewModel';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { cn } from '@/lib/utils'; // ShadCN utility

interface StationDriverCardProps {
  station: Station;
  onAddDriver: (stationId: string) => void;
  onEditDriver: (driver: Driver) => void;
  onDeleteDriver: (driverId: string) => void;
}

const StationDriverCard: React.FC<StationDriverCardProps> = ({
  station,
  onAddDriver,
  onEditDriver,
  onDeleteDriver
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Bu kart açıldığında, sadece bu istasyonun şoförlerini çek
  const { drivers, isLoading } = useDriverViewModel(isOpen ? station._id : undefined);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Kartın açılıp kapanmasını engelle
    onAddDriver(station._id);
  };

  return (
    <div className="border rounded-lg shadow-sm transition-all">
      {/* KART BAŞLIĞI (Her zaman görünür) */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <ChevronDown
            className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")}
          />
          <h3 className="text-lg font-semibold text-gray-800">{station.name}</h3>
        </div>
        <Button size="sm" onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Şoför Ekle
        </Button>
      </div>

      {/* AÇILIR İÇERİK (Şoför Tablosu) */}
      {isOpen && (
        <div className="p-4 border-t bg-gray-50">
          {isLoading && <p className="text-center text-gray-500">Şoförler yükleniyor...</p>}
          {!isLoading && drivers.length === 0 && (
            <p className="text-center text-gray-500">Bu durağa kayıtlı şoför bulunamadı.</p>
          )}
          {!isLoading && drivers.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad Soyad</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Plaka</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver._id}>
                    <TableCell className="font-medium">{driver.fullName}</TableCell>
                    <TableCell>{driver.phone}</TableCell>
                    <TableCell>{driver.vehiclePlate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        driver.status === 'active' ? 'bg-green-100 text-green-800' : 
                        driver.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {driver.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => onEditDriver(driver)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600" onClick={() => onDeleteDriver(driver._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
};

export default StationDriverCard;