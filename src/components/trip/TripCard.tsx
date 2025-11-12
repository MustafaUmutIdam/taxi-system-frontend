import { Trip } from "@/models/Trip";
import { MapPin, Phone, RefreshCw, User } from "lucide-react";

interface TripCardProps {
  trip: Trip;
  onResend?: (id: string) => void;
  isResending?: boolean;
}

export const TripCard: React.FC<TripCardProps> = ({ trip, onResend, isResending }) => {
  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      assigned: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Bekliyor',
      assigned: 'Atandı',
      accepted: 'Kabul Edildi',
      in_progress: 'Devam Ediyor',
      completed: 'Tamamlandı',
      cancelled: 'İptal Edildi',
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(trip.status)}`}>
            {getStatusText(trip.status)}
          </span>
          {trip.driver && (
            <p className="text-sm text-gray-600 mt-2">
              Şoför: <span className="font-medium">{trip.driver.fullName}</span>
            </p>
          )}
        </div>
        <div className="text-right">
          {trip.estimatedFare && (
            <div className="text-2xl font-bold text-blue-600">{trip.estimatedFare} ₺</div>
          )}
          {trip.distance && (
            <div className="text-sm text-gray-500">{trip.distance} km</div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {/* Müşteri */}
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-gray-700">{trip.customer.name || 'Müşteri'}</span>
          <Phone className="h-4 w-4 text-gray-400 ml-2" />
          <span className="text-gray-700">{trip.customer.phone}</span>
        </div>

        {/* Alınacak Adres */}
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <div className="text-xs text-gray-500 mb-1">Alınacak Adres</div>
            <div className="text-sm text-gray-700">{trip.pickup.address}</div>
          </div>
        </div>

        {/* Bırakılacak Adres */}
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
          <div>
            <div className="text-xs text-gray-500 mb-1">Bırakılacak Adres</div>
            <div className="text-sm text-gray-700">{trip.dropoff.address}</div>
          </div>
        </div>

        {/* Notlar */}
        {trip.notes && (
          <div className="bg-gray-50 rounded p-3">
            <div className="text-xs text-gray-500 mb-1">Notlar</div>
            <div className="text-sm text-gray-700">{trip.notes}</div>
          </div>
        )}

        {/* İptal Nedeni */}
        {trip.status === 'cancelled' && trip.cancellationReason && (
          <div className="bg-red-50 rounded p-3 border border-red-200 mt-3">
            <div className="text-xs text-red-500 font-semibold mb-1">İptal Nedeni</div>
            <div className="text-sm text-red-700">{trip.cancellationReason}</div>
          </div>
        )}
      </div>

      {/* İptal edilmiş ise yeniden gönder butonu */}
      {trip.status === 'cancelled' && onResend && (
        <div className="mt-4 pt-4 border-t">
          <button
            onClick={() => onResend(trip._id)}
            disabled={isResending}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            {isResending ? 'Gönderiliyor...' : 'Yeniden Gönder'}
          </button>
        </div>
      )}

      {/* Tarih */}
      <div className="mt-4 pt-4 border-t text-xs text-gray-500">
        Oluşturulma: {new Date(trip.createdAt).toLocaleString('tr-TR')}
      </div>
    </div>
  );
};