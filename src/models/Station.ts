export interface Station {
  _id: string;
  name: string;
  address: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };
  manager?: string;
  drivers?: string[];
  isActive: boolean;
  settings: {
    baseRate: number;
    perKmRate: number;
    nightSurcharge: number;
    nightStartHour: number;
    nightEndHour: number;
    minFare: number;
  };
  stats: {
    totalTrips: number;
    totalRevenue: number;
    activeDrivers: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateStationDTO {
  name: string;
  address: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };

  
}
