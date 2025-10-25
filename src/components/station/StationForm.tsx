import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const stationSchema = z.object({
  name: z.string().min(3, 'Durak adı en az 3 karakter olmalı'),
  address: z.string().min(10, 'Adres en az 10 karakter olmalı'),
  phone: z.string().regex(/^[0-9\s\-\+\(\)]+$/, 'Geçersiz telefon formatı'),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
});

type StationFormData = z.infer<typeof stationSchema>;

interface StationFormProps {
  onSubmit: (data: StationFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<StationFormData>;
}

const StationForm: React.FC<StationFormProps> = ({ 
  onSubmit, 
  isLoading = false,
  initialData 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StationFormData>({
    resolver: zodResolver(stationSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Durak Adı</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Örn: Kızılay Taksi Durağı"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="address">Adres</Label>
        <Input
          id="address"
          {...register('address')}
          placeholder="Tam adres giriniz"
        />
        {errors.address && (
          <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          {...register('phone')}
          placeholder="+90 312 123 45 67"
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="lat">Enlem (Latitude)</Label>
          <Input
            id="lat"
            type="number"
            step="any"
            {...register('location.lat', { valueAsNumber: true })}
            placeholder="39.9208"
          />
          {errors.location?.lat && (
            <p className="text-sm text-red-500 mt-1">{errors.location.lat.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lng">Boylam (Longitude)</Label>
          <Input
            id="lng"
            type="number"
            step="any"
            {...register('location.lng', { valueAsNumber: true })}
            placeholder="32.8541"
          />
          {errors.location?.lng && (
            <p className="text-sm text-red-500 mt-1">{errors.location.lng.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>
    </form>
  );
};

export default StationForm;