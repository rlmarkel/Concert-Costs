import {
  normalizeState,
  stateDisplayName,
  type UsStateCode,
} from "@/lib/us-states";
import type { ConcertWithMetrics } from "@/types/concert";

export type StateConcertGroup = {
  state: UsStateCode;
  concerts: ConcertWithMetrics[];
};

export function groupConcertsByState(
  concerts: ConcertWithMetrics[]
): Map<UsStateCode, ConcertWithMetrics[]> {
  const groups = new Map<UsStateCode, ConcertWithMetrics[]>();

  for (const concert of concerts) {
    const state = normalizeState(concert.state);
    if (!state) continue;

    const list = groups.get(state) ?? [];
    list.push(concert);
    groups.set(state, list);
  }

  for (const [state, list] of groups) {
    list.sort((a, b) =>
      a.concert_name.localeCompare(b.concert_name, undefined, {
        sensitivity: "base",
      })
    );
    groups.set(state, list);
  }

  return groups;
}

export function getStateGroupsArray(
  concerts: ConcertWithMetrics[]
): StateConcertGroup[] {
  const map = groupConcertsByState(concerts);
  return [...map.entries()]
    .map(([state, stateConcerts]) => ({ state, concerts: stateConcerts }))
    .sort((a, b) =>
      stateDisplayName(a.state).localeCompare(stateDisplayName(b.state))
    );
}
