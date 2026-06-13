import {
  MockAuthService,
  MockDriverProfileService,
  type AuthService,
  type DriverProfileService,
} from "@pitango/shared";

// MVP runs against in-memory mocks until a Firebase project is provisioned.
// To switch: initFirebase(firebaseConfig) in app entry, then swap these for
// FirebaseAuthService / FirebaseDriverProfileService.
export const authService: AuthService = new MockAuthService();
export const driverProfileService: DriverProfileService =
  new MockDriverProfileService();
