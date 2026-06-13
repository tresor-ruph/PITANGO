export interface PassengerProfile {
  uid: string;
  phone: string;
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  emergencyContacts: EmergencyContact[];
  createdAt: number;
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export type DriverStatus = "pending" | "verified" | "suspended";
export type DriverAvailability = "available" | "busy" | "offline";

export interface DriverProfile {
  uid: string;
  phone: string;
  firstName: string;
  lastName: string;
  photoUrl: string | null;
  vehicleInfo: VehicleInfo;
  documents: DriverDocuments;
  verificationStatus: DriverStatus;
  subscription: DriverSubscription | null;
  createdAt: number;
}

export interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;
}

export interface DriverDocuments {
  cni: DocumentRecord | null;
  driverLicense: DocumentRecord | null;
  vehicleRegistration: DocumentRecord | null;
  insurance: DocumentRecord | null;
}

export interface DocumentRecord {
  storageUrl: string;
  uploadedAt: number;
  expiresAt: number | null;
  status: "pending" | "approved" | "rejected";
}

export interface DriverSubscription {
  type: "daily" | "weekly";
  startDate: number;
  endDate: number;
  paymentMethod: "mtn_momo" | "orange_money";
  transactionId: string;
}
