"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { ConcertCard } from "@/components/ConcertCard";
import { ConcertSortBar } from "@/components/ConcertSortBar";
import { StaggerChildren, StaggerItem } from "@/components/PageTransition";
import {
  filterConcertsByState,
  parseStateFilter,
} from "@/lib/filter-concerts-by-state";
import { stateDisplayName } from "@/lib/us-states";
import {
  getDefaultSort,
  loadSavedSort,
  saveSort,
  sortConcerts,
  toggleDirection,
  type SortField,
  type SortState,
} from "@/lib/sort-concerts";
import type { ConcertWithMetrics } from "@/types/concert";

type ConcertsListProps = {
  concerts: ConcertWithMetrics[];
  stateFilter?: string;
  highlightId?: string;
};

export function ConcertsList({
  concerts,
  stateFilter,
  highlightId,
}: ConcertsListProps) {
  const [sort, setSort] = useState<SortState>(getDefaultSort);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSort(loadSavedSort());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!highlightId || !mounted) return;
    const el = document.getElementById(`concert-${highlightId}`);
    if (!el) return;
    const t = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
    return () => clearTimeout(t);
  }, [highlightId, mounted]);

  function updateSort(next: SortState) {
    setSort(next);
    saveSort(next);
  }

  function handleFieldChange(field: SortField) {
    updateSort({ ...sort, field });
  }

  function handleDirectionToggle() {
    updateSort({ ...sort, direction: toggleDirection(sort.direction) });
  }

  const filtered = useMemo(() => {
    if (stateFilter) {
      return filterConcertsByState(concerts, stateFilter);
    }
    return concerts;
  }, [concerts, stateFilter]);

  const sorted = useMemo(
    () => sortConcerts(filtered, sort),
    [filtered, sort]
  );

  const displaySort = mounted ? sort : getDefaultSort();
  const listKey = `${displaySort.field}-${displaySort.direction}`;
  const stateCode = parseStateFilter(stateFilter);
  const hasStateFilter = Boolean(stateCode);

  return (
    <div className="space-y-6">
      {hasStateFilter && (
        <div className="alert flex flex-col items-start gap-2 border border-primary/30 bg-primary/10 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm">
            Showing concerts in{" "}
            <strong>
              {stateDisplayName(stateCode!)} ({stateCode})
            </strong>
          </span>
          <Link href="/concerts" className="btn btn-ghost btn-xs gap-1">
            <X className="h-3 w-3" />
            Clear filter
          </Link>
        </div>
      )}

      <ConcertSortBar
        count={filtered.length}
        sort={displaySort}
        onFieldChange={handleFieldChange}
        onDirectionToggle={handleDirectionToggle}
      />

      {filtered.length === 0 ? (
        <p className="rounded-box border border-dashed border-base-300 py-10 text-center text-base-content/70">
          No concerts match this filter.
        </p>
      ) : (
        <StaggerChildren
          key={listKey}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {sorted.map((concert) => (
            <StaggerItem key={concert.id}>
              <ConcertCard
                concert={concert}
                highlighted={highlightId === concert.id}
              />
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}
    </div>
  );
}
