export interface Trip {
  _id: string;
  station?: {
    _id: string;
    name: string;
    address: string;
  };
  driver?: {
    _id: string;
    fullName: string;
    phone: string;
    vehiclePlate: string;
  };
  createdBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  status: 'pending' | 'assigned' | 'accepted' | 'rejected' | 'in_progress' | 'completed' | 'cancelled';
  customer: {
    name?: string;
    phone: string;
  };
  pickup: {
    address: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  dropoff: {
    address: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  distance?: number;
  estimatedDuration?: number;
  estimatedFare?: number;
  actualFare?: number;
  requestedAt: string;
  assignedAt?: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  currentAttempt?: number;
  maxAttempts?: number;
  assignmentExpiry?: string;
  rejectedDrivers?: Array<{
    driver: string;
    rejectedAt: string;
    reason?: string;
  }>;
  cancellationReason?: string;
  cancelledBy?: 'station' | 'driver' | 'customer' | 'system';
  notes?: string;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  fareDetails?: {
    baseRate: number;
    perKmRate: number;
    distance: number;
    isNightTime: boolean;
    nightSurcharge: number;
    total: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateTripDTO {
  station?: string; // Opsiyonel - yoksa tüm stationlar
  customer: {
    name?: string;
    phone: string;
  };
  pickup: {
    address: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  dropoff: {
    address: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  notes?: string;
}

export interface FareEstimate {
  distance: number;
  estimatedDuration: number;
  estimatedFare: number;
  fareDetails: {
    baseRate: number;
    perKmRate: number;
    distance: number;
    isNightTime: boolean;
    nightSurcharge: number;
    total: number;
  };
}