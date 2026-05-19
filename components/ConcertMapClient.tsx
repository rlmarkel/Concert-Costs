"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { FeatureCollection } from "geojson";
import { MapPin, PlusCircle } from "lucide-react";
import { StateMapPanel } from "@/components/StateMapPanel";
import { groupConcertsByState } from "@/lib/group-concerts-by-state";
import type { UsStateCode } from "@/lib/us-states";
import type { ConcertWithMetrics } from "@/types/concert";

const ConcertMap = dynamic(
  () =>
    import("@/components/ConcertMap").then((mod) => ({
      default: mod.ConcertMap,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="skeleton min-h-[420px] w-full rounded-box sm:min-h-[520px]" />
    ),
  }
);

export function ConcertMapClient({
  concerts,
}: {
  concerts: ConcertWithMetrics[];
}) {
  const [geoJson, setGeoJson] = useState<FeatureCollection | null>(null);
  const [hoveredState, setHoveredState] = useState<UsStateCode | null>(null);
  const [pinnedState, setPinnedState] = useState<UsStateCode | null>(null);

  const groups = useMemo(() => groupConcertsByState(concerts), [concerts]);
  const activeState = pinnedState ?? hoveredState;
  const activeConcerts = activeState ? groups.get(activeState) ?? [] : [];

  useEffect(() => {
    fetch("/data/us-states.geojson")
      .then((r) => r.json())
      .then(setGeoJson)
      .catch(() => setGeoJson(null));
  }, []);

  const handleStateHover = useCallback((state: UsStateCode | null) => {
    setHoveredState(state);
  }, []);

  const handleStateSelect = useCallback((state: UsStateCode | null) => {
    setPinnedState((prev) => (prev === state ? null : state));
  }, []);

  const handleMapBackgroundClick = useCallback(() => {
    setPinnedState(null);
    setHoveredState(null);
  }, []);

  if (concerts.length === 0) {
    return (
      <article className="card-elevated border border-dashed border-base-300">
        <section className="card-body items-center py-14 text-center">
          <div className="rounded-full bg-primary/10 p-5">
            <MapPin className="h-12 w-12 text-primary" aria-hidden />
          </div>
          <h2 className="mt-4 text-xl font-bold">No concerts to map yet</h2>
          <p className="mt-2 max-w-md text-base-content/70">
            Add concerts with a US state to see them on the map.
          </p>
          <Link
            href="/add"
            className="btn btn-primary btn-md mt-6 gap-2 active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            Add your first concert
          </Link>
        </section>
      </article>
    );
  }

  if (!geoJson) {
    return (
      <div className="card-elevated overflow-hidden border border-base-300">
        <div className="skeleton min-h-[420px] w-full sm:min-h-[520px]" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        className="card-elevated relative overflow-hidden border border-base-300 [&_.leaflet-container]:min-h-[420px] [&_.leaflet-container]:sm:min-h-[520px]"
        onClick={handleMapBackgroundClick}
        onKeyDown={(e) => {
          if (e.key === "Escape") handleMapBackgroundClick();
        }}
        role="presentation"
      >
        <div
          className="relative"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="presentation"
        >
          <ConcertMap
            geoJson={geoJson}
            activeState={activeState}
            onStateHover={handleStateHover}
            onStateSelect={handleStateSelect}
          />
          {activeState && (
            <StateMapPanel
              state={activeState}
              concerts={activeConcerts}
              onClose={() => {
                setPinnedState(null);
                setHoveredState(null);
              }}
            />
          )}
        </div>
      </div>
      <p className="text-center text-sm text-base-content/60">
        Hover a state on desktop or tap on mobile. Tap outside the map panel to
        close.
      </p>
    </div>
  );
}
