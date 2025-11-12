import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, User, Calculator, ArrowRight } from 'lucide-react';
import { useTripViewModel } from '../../viewmodels/useTripViewModel';
import { useStationViewModel } from '../../viewmodels/useStationViewModel';
import type { CreateTripDTO } from '../../models/Trip';

const CreateTripView: React.FC = () => {
  const navigate = useNavigate();
  const { createTrip, isCreating } = useTripViewModel();
  const { stations } = useStationViewModel();
  
  const [useAllStations, setUseAllStations] = useState(true);
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [estimatedDistance, setEstimatedDistance] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<CreateTripDTO>();

  const pickupLat = watch('pickup.location.lat');
  const pickupLng = watch('pickup.location.lng');
  const dropoffLat = watch('dropoff.location.lat');
  const dropoffLng = watch('dropoff.location.lng');

  // Mesafe ve ücret hesaplama (Haversine formülü)
  useEffect(() => {
    if (pickupLat && pickupLng && dropoffLat && dropoffLng) {
      const distance = calculateDistance(
        Number(pickupLat),
        Number(pickupLng),
        Number(dropoffLat),
        Number(dropoffLng)
      );
      setEstimatedDistance(distance);

      // Basit ücret hesaplama (50 TL açılış + 15 TL/km)
      const fare = 50 + (distance * 15);
      setEstimatedFare(Math.round(fare));
    } else {
      setEstimatedDistance(null);
      setEstimatedFare(null);
    }
  }, [pickupLat, pickupLng, dropoffLat, dropoffLng]);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Dünya yarıçapı (km)
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2));
  };

  const toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  const onSubmit = (data: CreateTripDTO) => {
    // Tüm stationlar seçiliyse station field'ini gönderme
    if (useAllStations) {
      delete data.station;
    }

    createTrip(data, {
      onSuccess: () => {
        navigate('/trips/pending');
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Yeni Yolculuk Oluştur</h1>
          <p className="text-gray-600 mt-2">
            Müşteri bilgilerini ve güzergah detaylarını girin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Durak Seçimi */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Hangi Şoförlere Gönderilsin?
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        checked={useAllStations}
                        onChange={() => setUseAllStations(true)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">Tüm Duraklar (Tüm Şoförler)</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        checked={!useAllStations}
                        onChange={() => setUseAllStations(false)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">Sadece Bir Durak</span>
                    </label>
                  </div>

                  {!useAllStations && (
                    <div className="mt-4">
                      <select
                        {...register('station', { required: !useAllStations })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Durak Seçin</option>
                        {stations.map((station) => (
                          <option key={station._id} value={station._id}>
                            {station.name}
                          </option>
                        ))}
                      </select>
                      {errors.station && (
                        <p className="text-sm text-red-500 mt-1">Durak seçimi gereklidir</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Müşteri Bilgileri */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Müşteri Bilgileri
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Müşteri Adı (Opsiyonel)
                      </label>
                      <input
                        type="text"
                        {...register('customer.name')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Ahmet Yılmaz"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        {...register('customer.phone', { 
                          required: 'Telefon gereklidir',
                          pattern: {
                            value: /^[0-9\s\-\+\(\)]+$/,
                            message: 'Geçersiz telefon formatı'
                          }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="05551234567"
                      />
                      {errors.customer?.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.customer.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Başlangıç Noktası */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Alınacak Adres
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adres <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register('pickup.address', { required: 'Adres gereklidir' })}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Kızılay Mahallesi, Atatürk Bulvarı No:123, Çankaya/Ankara"
                      />
                      {errors.pickup?.address && (
                        <p className="text-sm text-red-500 mt-1">{errors.pickup.address.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enlem (Latitude) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="any"
                          {...register('pickup.location.lat', { 
                            required: 'Enlem gereklidir',
                            valueAsNumber: true,
                            min: -90,
                            max: 90
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="39.9208"
                        />
                        {errors.pickup?.location?.lat && (
                          <p className="text-sm text-red-500 mt-1">{errors.pickup.location.lat.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Boylam (Longitude) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="any"
                          {...register('pickup.location.lng', { 
                            required: 'Boylam gereklidir',
                            valueAsNumber: true,
                            min: -180,
                            max: 180
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="32.8541"
                        />
                        {errors.pickup?.location?.lng && (
                          <p className="text-sm text-red-500 mt-1">{errors.pickup.location.lng.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bitiş Noktası */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    Bırakılacak Adres
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adres <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register('dropoff.address', { required: 'Adres gereklidir' })}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Esenboğa Havalimanı, Pursaklar/Ankara"
                      />
                      {errors.dropoff?.address && (
                        <p className="text-sm text-red-500 mt-1">{errors.dropoff.address.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Enlem (Latitude) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="any"
                          {...register('dropoff.location.lat', { 
                            required: 'Enlem gereklidir',
                            valueAsNumber: true,
                            min: -90,
                            max: 90
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="40.1281"
                        />
                        {errors.dropoff?.location?.lat && (
                          <p className="text-sm text-red-500 mt-1">{errors.dropoff.location.lat.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Boylam (Longitude) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="any"
                          {...register('dropoff.location.lng', { 
                            required: 'Boylam gereklidir',
                            valueAsNumber: true,
                            min: -180,
                            max: 180
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="32.9951"
                        />
                        {errors.dropoff?.location?.lng && (
                          <p className="text-sm text-red-500 mt-1">{errors.dropoff.location.lng.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notlar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notlar (Opsiyonel)
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Özel talimatlar veya notlar..."
                  />
                </div>

                {/* Butonlar */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isCreating ? 'Oluşturuluyor...' : (
                      <>
                        Yolculuk Oluştur
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Özet Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Yolculuk Özeti
              </h3>

              <div className="space-y-4">
                {estimatedDistance !== null && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Tahmini Mesafe</div>
                    <div className="text-2xl font-bold text-gray-800">{estimatedDistance} km</div>
                  </div>
                )}

                {estimatedFare !== null && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-600 mb-1">Tahmini Ücret</div>
                    <div className="text-2xl font-bold text-blue-600">{estimatedFare} ₺</div>
                    <div className="text-xs text-gray-500 mt-2">
                      50 ₺ açılış + {estimatedDistance} km × 15 ₺
                    </div>
                  </div>
                )}

                {!estimatedDistance && (
                  <div className="text-center text-gray-500 py-8">
                    <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">Koordinatları girin</p>
                    <p className="text-xs mt-1">Mesafe ve ücret otomatik hesaplanacak</p>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Açılış ücreti: 50 ₺</p>
                    <p>• Km başı: 15 ₺</p>
                    <p>• Gece zammı: %50 (00:00-06:00)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTripView;