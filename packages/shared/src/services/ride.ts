import type {
  RideSession,
  ActiveDriver,
  DriverBid,
  Location,
  PaymentMethod,
} from "../types";

export interface RideService {
  createSession(
    passengerId: string,
    pickup: Location,
    dropoff: Location,
    initialPrice: number,
    paymentMethod: PaymentMethod
  ): Promise<string>; // returns sessionId

  placeBid(sessionId: string, driverId: string, bidPrice: number): Promise<void>;

  acceptBid(sessionId: string, driverId: string): Promise<void>;

  cancelSession(sessionId: string): Promise<void>;

  updateStatus(sessionId: string, status: RideSession["status"]): Promise<void>;

  onSessionUpdate(
    sessionId: string,
    callback: (session: RideSession) => void
  ): () => void;
}

export interface DriverLocationService {
  updateLocation(driverId: string, lat: number, lng: number): Promise<void>;

  setAvailability(driverId: string, status: ActiveDriver["status"]): Promise<void>;

  onNearbyDriversUpdate(
    geohash: string,
    callback: (drivers: Record<string, ActiveDriver>) => void
  ): () => void;
}
