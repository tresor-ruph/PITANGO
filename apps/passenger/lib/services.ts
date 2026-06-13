import {
  MockAuthService,
  MockPassengerProfileService,
  type AuthService,
  type PassengerProfileService,
} from "@pitango/shared";

// MVP runs against in-memory mocks until a Firebase project is provisioned.
// To switch: initFirebase(firebaseConfig) in app entry, then swap these for
// FirebaseAuthService / FirebasePassengerProfileService.
export const authService: AuthService = new MockAuthService();
export const passengerProfileService: PassengerProfileService =
  new MockPassengerProfileService();
