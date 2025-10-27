import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Driver, CreateDriverDTO } from '../../models/Driver';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface DriverFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  initialData?: Driver | null;
  onCancel?: () => void;
}

const DriverForm: React.FC<DriverFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData,
  onCancel
}) => {
  const isEditing = !!initialData;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateDriverDTO>();

  useEffect(() => {
    if (initialData) {
      reset({
        fullName: initialData.fullName,
        phone: initialData.phone,
        email: initialData.email,
        licenseNumber: initialData.licenseNumber,
        vehiclePlate: initialData.vehiclePlate,
      });
    } else {
      reset({
        fullName: '',
        phone: '',
        email: '',
        password: '',
        licenseNumber: '',
        vehiclePlate: '',
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* İsim ve Telefon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Tam Adı</Label>
          <Input id="fullName" {...register('fullName', { required: 'İsim gereklidir' })} />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" {...register('phone', { required: 'Telefon gereklidir' })} />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>
      
      {/* Plaka ve Lisans Numarası */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="vehiclePlate">Araç Plakası</Label>
          <Input id="vehiclePlate" {...register('vehiclePlate', { required: 'Plaka gereklidir' })} />
          {errors.vehiclePlate && <p className="text-red-500 text-sm mt-1">{errors.vehiclePlate.message}</p>}
        </div>
         <div>
          <Label htmlFor="licenseNumber">Lisans Numarası</Label>
          <Input id="licenseNumber" {...register('licenseNumber', { required: 'Lisans numarası gereklidir' })} />
          {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber.message}</p>}
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">E-posta (Opsiyonel)</Label>
        <Input id="email" type="email" {...register('email')} />
      </div>

      {/* Sadece yeni şoför oluştururken şifre alanı gösterilir */}
      {!isEditing && (
        <div>
          <Label htmlFor="password">Şifre</Label>
          <Input id="password" type="password" {...register('password', { required: 'Şifre gereklidir' })} />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
      )}

      {/* Butonlar */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            İptal
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Kaydediliyor...' : isEditing ? 'Güncelle' : 'Kaydet'}
        </Button>
      </div>
    </form>
  );
};

export default DriverForm;