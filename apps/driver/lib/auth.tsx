import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MockAuthService, type DriverProfile } from "@pitango/shared";
import { authService, driverProfileService } from "./services";

const SESSION_KEY = "pitango.driver.uid";

export type AuthStatus =
  | "loading" // restoring persisted session
  | "unauthenticated" // no user, show login
  | "needs_documents" // authenticated, no profile/documents submitted yet
  | "pending_verification" // documents submitted, awaiting admin approval
  | "verified"; // approved, full access

function statusForProfile(profile: DriverProfile | null): AuthStatus {
  if (!profile) return "needs_documents";
  if (profile.verificationStatus === "verified") return "verified";
  return "pending_verification";
}

interface AuthContextValue {
  status: AuthStatus;
  uid: string | null;
  profile: DriverProfile | null;
  sendOtp: (phone: string) => Promise<string>;
  verifyOtp: (verificationId: string, code: string) => Promise<void>;
  submitDocuments: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [uid, setUid] = useState<string | null>(null);
  const [profile, setProfile] = useState<DriverProfile | null>(null);

  useEffect(() => {
    (async () => {
      const savedUid = await AsyncStorage.getItem(SESSION_KEY);
      if (!savedUid) {
        setStatus("unauthenticated");
        return;
      }
      if (authService instanceof MockAuthService) {
        authService.restoreSession(savedUid);
      }
      const existing = await driverProfileService.get(savedUid);
      setUid(savedUid);
      setProfile(existing);
      setStatus(statusForProfile(existing));
    })();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      uid,
      profile,
      sendOtp: (phone) => authService.sendOtp(phone),
      verifyOtp: async (verificationId, code) => {
        const newUid = await authService.verifyOtp(verificationId, code);
        await AsyncStorage.setItem(SESSION_KEY, newUid);
        const existing = await driverProfileService.get(newUid);
        setUid(newUid);
        setProfile(existing);
        setStatus(statusForProfile(existing));
      },
      submitDocuments: async () => {
        if (!uid) throw new Error("Non authentifié.");
        // In the MVP mock, creating the profile marks documents as submitted and
        // the account as pending admin approval.
        await driverProfileService.create(uid, {
          phone: "",
          firstName: "",
          lastName: "",
          photoUrl: null,
          vehicleInfo: {
            make: "",
            model: "",
            year: 0,
            color: "",
            plateNumber: "",
          },
          documents: {
            cni: null,
            driverLicense: null,
            vehicleRegistration: null,
            insurance: null,
          },
          verificationStatus: "pending",
          subscription: null,
        });
        const updated = await driverProfileService.get(uid);
        setProfile(updated);
        setStatus(statusForProfile(updated));
      },
      refreshProfile: async () => {
        if (!uid) return;
        const updated = await driverProfileService.get(uid);
        setProfile(updated);
        setStatus(statusForProfile(updated));
      },
      signOut: async () => {
        await authService.signOut();
        await AsyncStorage.removeItem(SESSION_KEY);
        setUid(null);
        setProfile(null);
        setStatus("unauthenticated");
      },
    }),
    [status, uid, profile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider.");
  return ctx;
}
