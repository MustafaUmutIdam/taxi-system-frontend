import type { Station } from './Station';

// Driver verisinin tam hali
export interface Driver {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  licenseNumber: string;
  vehiclePlate: string;
  station: string | Station; // Bazen ID, bazen de obje olarak gelebilir
  status: 'active' | 'busy' | 'offline' | 'break';
  profileImage?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

// Yeni şoför oluşturmak için kullanılacak veri tipi
export interface CreateDriverDTO {
  fullName: string;
  phone: string;
  email?: string;
  password?: string; // Oluştururken gerekli
  licenseNumber: string;
  vehiclePlate: string;
  station: string; // Sadece istasyon ID'si yeterli
}

// Şoför güncellemek için kullanılacak veri tipi
export interface UpdateDriverDTO extends Partial<Omit<CreateDriverDTO, 'station' | 'password'>> {
  // Güncelleme sırasında şifre genellikle ayrı bir işlemle yapılır.
  // Station ID'si de değiştirilmez.
}