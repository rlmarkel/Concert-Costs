import { normalizeState, type UsStateCode } from "@/lib/us-states";
import type { ConcertWithMetrics } from "@/types/concert";

export function filterConcertsByState(
  concerts: ConcertWithMetrics[],
  stateInput: string
): ConcertWithMetrics[] {
  const stateCode = normalizeState(stateInput);
  if (!stateCode) return concerts;

  return concerts.filter(
    (concert) => normalizeState(concert.state) === stateCode
  );
}

export function parseStateFilter(
  stateInput: string | undefined
): UsStateCode | null {
  if (!stateInput) return null;
  return normalizeState(stateInput);
}
