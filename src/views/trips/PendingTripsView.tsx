import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Phone, User, Plus, RefreshCw } from 'lucide-react';
import { useTripViewModel } from '../../viewmodels/useTripViewModel';
import type { Trip } from '../../models/Trip';
import { TripCard } from '@/components/trip/TripCard';

const PendingTripsView: React.FC = () => {
  const navigate = useNavigate();
  const { trips, isLoading, resendTrip, isResending } = useTripViewModel('pending');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Bekleyen İşler</h1>
            <p className="text-gray-600 mt-1">Şoföre atanmayı bekleyen yolculuklar</p>
          </div>
          <button
            onClick={() => navigate('/trips/create')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Yeni Yolculuk
          </button>
        </div>

        {trips.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} onResend={resendTrip} isResending={isResending} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 text-lg">Bekleyen yolculuk yok</p>
            <button
              onClick={() => navigate('/trips/create')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Yeni Yolculuk Oluştur
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default PendingTripsView;