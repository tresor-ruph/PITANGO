import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MockAuthService, type PassengerProfile } from "@pitango/shared";
import { authService, passengerProfileService } from "./services";

const SESSION_KEY = "pitango.passenger.uid";

export type AuthStatus =
  | "loading" // restoring persisted session
  | "unauthenticated" // no user, show login
  | "needs_profile" // authenticated but profile not created
  | "authenticated"; // fully onboarded

interface AuthContextValue {
  status: AuthStatus;
  uid: string | null;
  profile: PassengerProfile | null;
  sendOtp: (phone: string) => Promise<string>;
  verifyOtp: (verificationId: string, code: string) => Promise<void>;
  completeProfile: (firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [uid, setUid] = useState<string | null>(null);
  const [profile, setProfile] = useState<PassengerProfile | null>(null);

  // Restore a persisted session on startup.
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
      const existing = await passengerProfileService.get(savedUid);
      setUid(savedUid);
      setProfile(existing);
      setStatus(existing ? "authenticated" : "needs_profile");
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
        const existing = await passengerProfileService.get(newUid);
        setUid(newUid);
        setProfile(existing);
        setStatus(existing ? "authenticated" : "needs_profile");
      },
      completeProfile: async (firstName, lastName) => {
        if (!uid) throw new Error("Non authentifié.");
        await passengerProfileService.create(uid, {
          phone: "",
          firstName,
          lastName,
          photoUrl: null,
          emergencyContacts: [],
        });
        setProfile(await passengerProfileService.get(uid));
        setStatus("authenticated");
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
