export const NEGOTIATION_TIMEOUT_MS = 120_000; // 120 seconds

export const COUNTER_OFFER_INCREMENTS = [200, 500] as const; // FCFA

export const GPS_REFRESH_NORMAL_MS = 10_000; // 10 seconds
export const GPS_REFRESH_SOS_MS = 2_000; // 2 seconds during SOS

export const RETRY_INTERVALS_MS = [1_000, 2_000, 4_000, 8_000] as const; // exponential backoff

export const DRIVER_SEARCH_RADIUS_KM = 5;
