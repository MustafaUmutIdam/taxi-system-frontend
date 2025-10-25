import type { Driver } from "./Driver";

export interface Trip {
  _id: string;
  station: string;
  driver?: Driver;
  createdBy: string;
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
  estimatedFare?: number;
  actualFare?: number;
  requestedAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  rejectedDrivers?: Array<{
    driver: string;
    rejectedAt: string;
  }>;
  cancellationReason?: string;
  cancelledBy?: 'station' | 'driver' | 'customer';
  notes?: string;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTripDTO {
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