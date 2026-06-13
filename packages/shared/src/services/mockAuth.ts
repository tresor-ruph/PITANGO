import type {
  AuthService,
  PassengerProfileService,
  DriverProfileService,
} from "./auth";
import type { PassengerProfile, DriverProfile } from "../types";

/** Dev OTP code accepted by the mock auth service. */
export const MOCK_OTP_CODE = "123456";

const MOCK_DELAY_MS = 600;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function uidFromPhone(phone: string): string {
  return "mock_" + phone.replace(/\D/g, "");
}

/**
 * In-memory phone-auth stand-in so the apps run before a Firebase project
 * exists. Any phone number is accepted; the OTP is always MOCK_OTP_CODE.
 */
export class MockAuthService implements AuthService {
  private currentUid: string | null = null;
  private pending = new Map<string, string>(); // verificationId -> uid
  private listeners = new Set<(uid: string | null) => void>();

  async sendOtp(phoneNumber: string): Promise<string> {
    await delay(MOCK_DELAY_MS);
    const verificationId = "mock_vid_" + Date.now();
    this.pending.set(verificationId, uidFromPhone(phoneNumber));
    return verificationId;
  }

  async verifyOtp(verificationId: string, code: string): Promise<string> {
    await delay(MOCK_DELAY_MS);
    const uid = this.pending.get(verificationId);
    if (!uid) {
      throw new Error("Aucune vérification en attente pour cet identifiant.");
    }
    if (code !== MOCK_OTP_CODE) {
      throw new Error("Code OTP invalide.");
    }
    this.pending.delete(verificationId);
    this.setCurrentUid(uid);
    return uid;
  }

  async signOut(): Promise<void> {
    this.setCurrentUid(null);
  }

  getCurrentUserId(): string | null {
    return this.currentUid;
  }

  /** Restore a persisted session (used by the app on startup). */
  restoreSession(uid: string | null): void {
    this.setCurrentUid(uid);
  }

  onAuthStateChanged(callback: (uid: string | null) => void): () => void {
    this.listeners.add(callback);
    callback(this.currentUid);
    return () => this.listeners.delete(callback);
  }

  private setCurrentUid(uid: string | null): void {
    this.currentUid = uid;
    for (const listener of this.listeners) listener(uid);
  }
}

class MockProfileStore<T extends { uid: string; createdAt: number }> {
  protected store = new Map<string, T>();

  async getRaw(uid: string): Promise<T | null> {
    await delay(MOCK_DELAY_MS);
    return this.store.get(uid) ?? null;
  }

  async updateRaw(uid: string, data: Partial<T>): Promise<void> {
    await delay(MOCK_DELAY_MS);
    const existing = this.store.get(uid);
    if (existing) this.store.set(uid, { ...existing, ...data });
  }
}

export class MockPassengerProfileService
  extends MockProfileStore<PassengerProfile>
  implements PassengerProfileService
{
  async create(
    uid: string,
    data: Omit<PassengerProfile, "uid" | "createdAt">
  ): Promise<void> {
    await delay(MOCK_DELAY_MS);
    this.store.set(uid, { uid, createdAt: Date.now(), ...data });
  }

  get(uid: string): Promise<PassengerProfile | null> {
    return this.getRaw(uid);
  }

  update(uid: string, data: Partial<PassengerProfile>): Promise<void> {
    return this.updateRaw(uid, data);
  }
}

export class MockDriverProfileService
  extends MockProfileStore<DriverProfile>
  implements DriverProfileService
{
  async create(
    uid: string,
    data: Omit<DriverProfile, "uid" | "createdAt">
  ): Promise<void> {
    await delay(MOCK_DELAY_MS);
    this.store.set(uid, { uid, createdAt: Date.now(), ...data });
  }

  get(uid: string): Promise<DriverProfile | null> {
    return this.getRaw(uid);
  }

  update(uid: string, data: Partial<DriverProfile>): Promise<void> {
    return this.updateRaw(uid, data);
  }
}
