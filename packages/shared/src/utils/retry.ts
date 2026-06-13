import { RETRY_INTERVALS_MS } from "../constants/config";

export async function withExponentialBackoff<T>(
  fn: () => Promise<T>,
  intervals: readonly number[] = RETRY_INTERVALS_MS
): Promise<T> {
  let lastError: unknown;

  for (const delay of intervals) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // Final attempt without delay
  try {
    return await fn();
  } catch (error) {
    throw lastError ?? error;
  }
}
