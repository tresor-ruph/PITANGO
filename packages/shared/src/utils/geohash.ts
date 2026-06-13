const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";

export function encodeGeohash(
  lat: number,
  lng: number,
  precision: number = 7
): string {
  let minLat = -90,
    maxLat = 90;
  let minLng = -180,
    maxLng = 180;
  let hash = "";
  let bit = 0;
  let ch = 0;
  let isLng = true;

  while (hash.length < precision) {
    const mid = isLng ? (minLng + maxLng) / 2 : (minLat + maxLat) / 2;
    const val = isLng ? lng : lat;

    if (val > mid) {
      ch |= 1 << (4 - bit);
      if (isLng) minLng = mid;
      else minLat = mid;
    } else {
      if (isLng) maxLng = mid;
      else maxLat = mid;
    }

    isLng = !isLng;
    bit++;

    if (bit === 5) {
      hash += BASE32[ch];
      bit = 0;
      ch = 0;
    }
  }

  return hash;
}

export function getGeohashNeighbors(geohash: string): string[] {
  const len = geohash.length;
  const prefix = geohash.substring(0, len - 1);
  const lastChar = geohash[len - 1];
  const idx = BASE32.indexOf(lastChar);

  const neighbors: string[] = [geohash];
  if (idx > 0) neighbors.push(prefix + BASE32[idx - 1]);
  if (idx < 31) neighbors.push(prefix + BASE32[idx + 1]);

  return neighbors;
}
