export type RideStatus =
  | "negotiating"
  | "accepted"
  | "driver_en_route"
  | "in_progress"
  | "completed"
  | "cancelled";

export type PaymentMethod = "cash" | "mtn_momo" | "orange_money";

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface RideSession {
  id: string;
  passengerId: string;
  status: RideStatus;
  route: {
    pickup: Location;
    dropoff: Location;
  };
  offers: RideOffers;
  acceptedDriverId: string | null;
  paymentMethod: PaymentMethod;
  createdAt: number;
  expiresAt: number;
}

export interface RideOffers {
  initialPassengerPrice: number;
  currentHighestCounter: number;
  driverBids: Record<string, DriverBid>;
}

export interface DriverBid {
  bidPrice: number;
  timestamp: number;
  status: "pending" | "accepted" | "rejected";
}

export interface ActiveDriver {
  g: string; // geohash
  l: [number, number]; // [lat, lng]
  status: "available" | "busy";
  lastOnline: number;
}
