import React from 'react';
import { MapPin, Phone, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Station } from '../../models/Station';

interface StationCardProps {
  station: Station;
}

const StationCard: React.FC<StationCardProps> = ({ station }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{station.name}</CardTitle>
          <Badge variant={station.isActive ? 'default' : 'secondary'}>
            {station.isActive ? 'Aktif' : 'Pasif'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-1 text-gray-500" />
          <p className="text-sm text-gray-600">{station.address}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-gray-500" />
          <p className="text-sm text-gray-600">{station.phone}</p>
        </div>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          <p className="text-sm text-gray-600">
            {station.stats.activeDrivers} Aktif Şoför
          </p>
        </div>

        <div className="pt-3 border-t mt-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Toplam Yolculuk</p>
            <p className="font-semibold">{station.stats.totalTrips}</p>
          </div>
          <div>
            <p className="text-gray-500">Gelir</p>
            <p className="font-semibold">{station.stats.totalRevenue} ₺</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StationCard;