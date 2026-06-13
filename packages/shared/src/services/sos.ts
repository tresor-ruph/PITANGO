export interface SosAlert {
  id: string;
  userId: string;
  userType: "passenger" | "driver";
  sessionId: string | null;
  lat: number;
  lng: number;
  triggeredAt: number;
  resolved: boolean;
}

export interface SosService {
  trigger(
    userId: string,
    userType: "passenger" | "driver",
    lat: number,
    lng: number,
    sessionId: string | null
  ): Promise<string>; // returns alertId

  resolve(alertId: string): Promise<void>;

  onActiveAlerts(callback: (alerts: SosAlert[]) => void): () => void;
}
