import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useTripViewModel } from '../../viewmodels/useTripViewModel';
import { TripCard } from '../../components/trip/TripCard';

const CompletedTripsView: React.FC = () => {
  const { trips, isLoading } = useTripViewModel('completed');

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tamamlanan Yolculuklar</h1>
        
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 text-lg">Tamamlanan yolculuk yok</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default CompletedTripsView;