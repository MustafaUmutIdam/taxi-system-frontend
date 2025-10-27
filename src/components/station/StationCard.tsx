import React from 'react';
import { MapPin, Phone, Edit, Trash2 } from 'lucide-react';
import type { Station } from '../../models/Station';

interface StationCardProps {
  station: Station;
  onEdit?: (station: Station) => void;
  onDelete?: (id: string) => void;
}

const StationCard: React.FC<StationCardProps> = ({ station, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{station.name}</h3>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(station)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Düzenle"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                if (window.confirm(`"${station.name}" durağını silmek istediğinizden emin misiniz?`)) {
                  onDelete(station._id);
                }
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Sil"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
          <p className="text-sm text-gray-600">{station.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-gray-500" />
          <p className="text-sm text-gray-600">{station.phone}</p>
        </div>

        <div className="pt-3 border-t mt-3">
          <div className="text-xs text-gray-500">
            Konum: {station.location.lat.toFixed(4)}, {station.location.lng.toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationCard;