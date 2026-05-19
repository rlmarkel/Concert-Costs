import type { ConcertWithMetrics } from "@/types/concert";

export type SortField =
  | "date"
  | "cost"
  | "fun"
  | "costPerHour"
  | "value"
  | "name"
  | "artist"
  | "distance"
  | "state";

export type SortDirection = "asc" | "desc";

export type SortState = {
  field: SortField;
  direction: SortDirection;
};

export const SORT_FIELDS: { field: SortField; label: string }[] = [
  { field: "date", label: "Date" },
  { field: "cost", label: "Total cost" },
  { field: "fun", label: "Fun rating" },
  { field: "costPerHour", label: "Cost per hour" },
  { field: "value", label: "Best value" },
  { field: "name", label: "Concert name" },
  { field: "artist", label: "Artist" },
  { field: "distance", label: "Distance" },
  { field: "state", label: "State" },
];

const STORAGE_KEY = "concert-cost-sort-v2";
const LEGACY_STORAGE_KEY = "concert-cost-sort";

/** Default: newest concerts first */
export function getDefaultSort(): SortState {
  return { field: "date", direction: "desc" };
}

function parseLegacyKey(key: string): SortState | null {
  const legacyMap: Record<string, SortState> = {
    "date-desc": { field: "date", direction: "desc" },
    "date-asc": { field: "date", direction: "asc" },
    "cost-desc": { field: "cost", direction: "desc" },
    "cost-asc": { field: "cost", direction: "asc" },
    "fun-desc": { field: "fun", direction: "desc" },
    "fun-asc": { field: "fun", direction: "asc" },
    "cost-per-hour-desc": { field: "costPerHour", direction: "desc" },
    "cost-per-hour-asc": { field: "costPerHour", direction: "asc" },
    "value-desc": { field: "value", direction: "desc" },
    "value-asc": { field: "value", direction: "asc" },
    "name-asc": { field: "name", direction: "asc" },
    "name-desc": { field: "name", direction: "desc" },
    "artist-asc": { field: "artist", direction: "asc" },
    "distance-desc": { field: "distance", direction: "desc" },
  };
  return legacyMap[key] ?? null;
}

export function loadSavedSort(): SortState {
  if (typeof window === "undefined") return getDefaultSort();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as SortState;
      if (
        SORT_FIELDS.some((f) => f.field === parsed.field) &&
        (parsed.direction === "asc" || parsed.direction === "desc")
      ) {
        return parsed;
      }
    }
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const fromLegacy = parseLegacyKey(legacy);
      if (fromLegacy) return fromLegacy;
    }
  } catch {
    // ignore
  }
  return getDefaultSort();
}

export function saveSort(state: SortState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function toggleDirection(direction: SortDirection): SortDirection {
  return direction === "asc" ? "desc" : "asc";
}

/** Label for the order toggle button (describes current order). */
export function orderLabel(field: SortField, direction: SortDirection): string {
  const high = direction === "desc";
  switch (field) {
    case "date":
      return high ? "Newest first" : "Oldest first";
    case "cost":
      return high ? "Highest first" : "Lowest first";
    case "fun":
      return high ? "Most fun first" : "Least fun first";
    case "costPerHour":
      return high ? "Highest first" : "Lowest first";
    case "value":
      return high ? "Best value first" : "Lowest value first";
    case "name":
      return high ? "Z → A" : "A → Z";
    case "artist":
      return high ? "Z → A" : "A → Z";
    case "distance":
      return high ? "Farthest first" : "Closest first";
    case "state":
      return high ? "Z → A" : "A → Z";
    default:
      return high ? "Descending" : "Ascending";
  }
}

export function sortConcerts(
  concerts: ConcertWithMetrics[],
  { field, direction }: SortState
): ConcertWithMetrics[] {
  const sorted = [...concerts];
  const mult = direction === "asc" ? 1 : -1;

  switch (field) {
    case "date":
      return sorted.sort(
        (a, b) => mult * a.concert_date.localeCompare(b.concert_date)
      );
    case "cost":
      return sorted.sort((a, b) => mult * (a.totalCost - b.totalCost));
    case "fun":
      return sorted.sort((a, b) => mult * (a.fun_rating - b.fun_rating));
    case "costPerHour":
      return sorted.sort((a, b) => mult * (a.costPerHour - b.costPerHour));
    case "value":
      return sorted.sort((a, b) => mult * (a.funPointsPer100 - b.funPointsPer100));
    case "name":
      return sorted.sort(
        (a, b) =>
          mult *
          a.concert_name.localeCompare(b.concert_name, undefined, {
            sensitivity: "base",
          })
      );
    case "artist":
      return sorted.sort(
        (a, b) =>
          mult *
          a.artist.localeCompare(b.artist, undefined, { sensitivity: "base" })
      );
    case "distance":
      return sorted.sort(
        (a, b) =>
          mult *
          (Number(a.distance_from_home) - Number(b.distance_from_home))
      );
    case "state":
      return sorted.sort(
        (a, b) =>
          mult *
          a.state.localeCompare(b.state, undefined, { sensitivity: "base" })
      );
    default:
      return sorted;
  }
}
