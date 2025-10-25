export interface Driver {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  licenseNumber: string;
  vehiclePlate: string;
  station: string;
  status: 'active' | 'busy' | 'offline' | 'break';
  currentLocation?: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
  profileImage?: string;
  rating: number;
  totalTrips: number;
  balance: number;
  pendingBalance: number;
  isActive: boolean;
  lastOnline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDriverDTO {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
  licenseNumber: string;
  vehiclePlate: string;
  station: string;
}