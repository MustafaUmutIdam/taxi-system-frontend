import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { CreateStationDTO, Station } from '../../models/Station';

interface StationFormProps {
  onSubmit: (data: CreateStationDTO) => void;
  isLoading?: boolean;
  initialData?: Station;
  onCancel?: () => void;
}

const StationForm: React.FC<StationFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData,
  onCancel
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateStationDTO>({
    defaultValues: initialData ? {
      name: initialData.name,
      address: initialData.address,
      phone: initialData.phone,
      location: {
        lat: initialData.location.lat,
        lng: initialData.location.lng
      }
    } : {
      name: '',
      address: '',
      phone: '',
      location: {
        lat: 0,
        lng: 0
      }
    }
  });

  // initialData değiştiğinde formu güncelle
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        address: initialData.address,
        phone: initialData.phone,
        location: {
          lat: initialData.location.lat,
          lng: initialData.location.lng
        }
      });
    } else {
      reset({
        name: '',
        address: '',
        phone: '',
        location: { lat: 0, lng: 0 }
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Durak Adı <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { 
            required: 'Durak adı gereklidir',
            minLength: { value: 3, message: 'En az 3 karakter olmalı' }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Örn: Kızılay Taksi Durağı"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Adres <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          {...register('address', { 
            required: 'Adres gereklidir',
            minLength: { value: 10, message: 'En az 10 karakter olmalı' }
          })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Tam adres giriniz"
        />
        {errors.address && (
          <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Telefon <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone', { 
            required: 'Telefon gereklidir',
            pattern: {
              value: /^[0-9\s\-\+\(\)]+$/,
              message: 'Geçersiz telefon formatı'
            }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="+90 312 123 45 67"
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-2">
            Enlem (Latitude) <span className="text-red-500">*</span>
          </label>
          <input
            id="lat"
            type="number"
            step="any"
            {...register('location.lat', { 
              required: 'Enlem gereklidir',
              valueAsNumber: true,
              min: { value: -90, message: 'Minimum -90' },
              max: { value: 90, message: 'Maximum 90' }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="39.9208"
          />
          {errors.location?.lat && (
            <p className="text-sm text-red-500 mt-1">{errors.location.lat.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lng" className="block text-sm font-medium text-gray-700 mb-2">
            Boylam (Longitude) <span className="text-red-500">*</span>
          </label>
          <input
            id="lng"
            type="number"
            step="any"
            {...register('location.lng', { 
              required: 'Boylam gereklidir',
              valueAsNumber: true,
              min: { value: -180, message: 'Minimum -180' },
              max: { value: 180, message: 'Maximum 180' }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="32.8541"
          />
          {errors.location?.lng && (
            <p className="text-sm text-red-500 mt-1">{errors.location.lng.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            İptal
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Kaydediliyor...' : initialData ? 'Güncelle' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
};

export default StationForm;