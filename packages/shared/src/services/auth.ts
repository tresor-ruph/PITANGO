import type { PassengerProfile, DriverProfile } from "../types";

export interface AuthService {
  sendOtp(phoneNumber: string): Promise<string>; // returns verificationId
  verifyOtp(verificationId: string, code: string): Promise<string>; // returns uid
  signOut(): Promise<void>;
  getCurrentUserId(): string | null;
  onAuthStateChanged(callback: (uid: string | null) => void): () => void;
}

export interface PassengerProfileService {
  create(uid: string, data: Omit<PassengerProfile, "uid" | "createdAt">): Promise<void>;
  get(uid: string): Promise<PassengerProfile | null>;
  update(uid: string, data: Partial<PassengerProfile>): Promise<void>;
}

export interface DriverProfileService {
  create(uid: string, data: Omit<DriverProfile, "uid" | "createdAt">): Promise<void>;
  get(uid: string): Promise<DriverProfile | null>;
  update(uid: string, data: Partial<DriverProfile>): Promise<void>;
}
