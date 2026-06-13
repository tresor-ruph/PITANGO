import {
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type ApplicationVerifier,
  type ConfirmationResult,
} from "firebase/auth";
import { ref, get, set, update } from "firebase/database";
import { getFirebaseAuth, getFirebaseDatabase } from "./firebase";
import type {
  AuthService,
  PassengerProfileService,
  DriverProfileService,
} from "./auth";
import type { PassengerProfile, DriverProfile } from "../types";

/**
 * Firebase-backed phone (OTP) authentication.
 *
 * Native (iOS/Android dev build) requires an ApplicationVerifier. Inject a
 * provider via the constructor — on web this is a RecaptchaVerifier, on native
 * it is supplied by the platform reCAPTCHA flow. The verifier is only needed
 * for sendOtp, so profile reads/writes work without it.
 */
export class FirebaseAuthService implements AuthService {
  private confirmations = new Map<string, ConfirmationResult>();

  constructor(private getVerifier: () => ApplicationVerifier) {}

  async sendOtp(phoneNumber: string): Promise<string> {
    const confirmation = await signInWithPhoneNumber(
      getFirebaseAuth(),
      phoneNumber,
      this.getVerifier()
    );
    this.confirmations.set(confirmation.verificationId, confirmation);
    return confirmation.verificationId;
  }

  async verifyOtp(verificationId: string, code: string): Promise<string> {
    const confirmation = this.confirmations.get(verificationId);
    if (!confirmation) {
      throw new Error("Aucune vérification en attente pour cet identifiant.");
    }
    const credential = await confirmation.confirm(code);
    this.confirmations.delete(verificationId);
    return credential.user.uid;
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(getFirebaseAuth());
  }

  getCurrentUserId(): string | null {
    return getFirebaseAuth().currentUser?.uid ?? null;
  }

  onAuthStateChanged(callback: (uid: string | null) => void): () => void {
    return firebaseOnAuthStateChanged(getFirebaseAuth(), (user) => {
      callback(user?.uid ?? null);
    });
  }
}

export class FirebasePassengerProfileService implements PassengerProfileService {
  async create(
    uid: string,
    data: Omit<PassengerProfile, "uid" | "createdAt">
  ): Promise<void> {
    const profile: PassengerProfile = { uid, createdAt: Date.now(), ...data };
    await set(ref(getFirebaseDatabase(), `passengers/${uid}`), profile);
  }

  async get(uid: string): Promise<PassengerProfile | null> {
    const snapshot = await get(ref(getFirebaseDatabase(), `passengers/${uid}`));
    return snapshot.exists() ? (snapshot.val() as PassengerProfile) : null;
  }

  async update(uid: string, data: Partial<PassengerProfile>): Promise<void> {
    await update(ref(getFirebaseDatabase(), `passengers/${uid}`), data);
  }
}

export class FirebaseDriverProfileService implements DriverProfileService {
  async create(
    uid: string,
    data: Omit<DriverProfile, "uid" | "createdAt">
  ): Promise<void> {
    const profile: DriverProfile = { uid, createdAt: Date.now(), ...data };
    await set(ref(getFirebaseDatabase(), `drivers/${uid}`), profile);
  }

  async get(uid: string): Promise<DriverProfile | null> {
    const snapshot = await get(ref(getFirebaseDatabase(), `drivers/${uid}`));
    return snapshot.exists() ? (snapshot.val() as DriverProfile) : null;
  }

  async update(uid: string, data: Partial<DriverProfile>): Promise<void> {
    await update(ref(getFirebaseDatabase(), `drivers/${uid}`), data);
  }
}
