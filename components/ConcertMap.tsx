"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import L from "leaflet";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { stateCodeFromGeoName, type UsStateCode } from "@/lib/us-states";

const US_CENTER: [number, number] = [39.8283, -98.5795];
const US_ZOOM = 4;

const FILL_BRIGHT = "color-mix(in oklab, var(--color-primary) 78%, white)";
const FILL_LIGHT = "color-mix(in oklab, var(--color-primary) 38%, white)";

type StateFeatureProps = { name: string; density?: number };
type StateFeature = Feature<Geometry, StateFeatureProps>;

function MapResizeFix() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

type ConcertMapProps = {
  geoJson: FeatureCollection;
  activeState: UsStateCode | null;
  onStateHover: (state: UsStateCode | null) => void;
  onStateSelect: (state: UsStateCode | null) => void;
};

export function ConcertMap({
  geoJson,
  activeState,
  onStateHover,
  onStateSelect,
}: ConcertMapProps) {
  const layerRefs = useRef<Map<string, L.Path>>(new Map());
  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

  const baseStyle = useCallback((): L.PathOptions => {
    return {
      fillColor: FILL_BRIGHT,
      weight: 1,
      opacity: 1,
      color: "color-mix(in oklab, var(--color-base-content) 25%, transparent)",
      fillOpacity: 0.92,
    };
  }, []);

  const setLayerHighlight = useCallback((layer: L.Path, highlighted: boolean) => {
    layer.setStyle({
      fillColor: highlighted ? FILL_LIGHT : FILL_BRIGHT,
      weight: highlighted ? 2 : 1,
    });
  }, []);

  const styleFeature = useCallback(
    (feature?: StateFeature): L.PathOptions => {
      const code = feature
        ? stateCodeFromGeoName(feature.properties.name)
        : null;
      const isActive = code && activeState === code;
      return {
        ...baseStyle(),
        fillColor: isActive ? FILL_LIGHT : FILL_BRIGHT,
        weight: isActive ? 2 : 1,
      };
    },
    [activeState, baseStyle]
  );

  const onEachFeature = useCallback(
    (feature: StateFeature, layer: L.Layer) => {
      const path = layer as L.Path;
      const code = stateCodeFromGeoName(feature.properties.name);
      if (!code) return;

      layerRefs.current.set(code, path);

      path.on({
        mouseover: () => {
          if (canHover) {
            setLayerHighlight(path, true);
            onStateHover(code);
          }
        },
        mouseout: () => {
          if (canHover) {
            setLayerHighlight(path, false);
            onStateHover(null);
          }
        },
        click: (e) => {
          L.DomEvent.stopPropagation(e);
          onStateSelect(code);
        },
      });
    },
    [canHover, onStateHover, onStateSelect, setLayerHighlight]
  );

  useEffect(() => {
    layerRefs.current.forEach((layer, code) => {
      setLayerHighlight(layer, activeState === code);
    });
  }, [activeState, setLayerHighlight]);

  return (
    <MapContainer
      center={US_CENTER}
      zoom={US_ZOOM}
      className="z-0 w-full rounded-box"
      style={{ height: "100%", minHeight: 420 }}
      scrollWheelZoom
      aria-label="Map of US states where you attended concerts"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapResizeFix />
      <GeoJSON
        data={geoJson}
        style={(f) => styleFeature(f as StateFeature)}
        onEachFeature={(f, layer) => onEachFeature(f as StateFeature, layer)}
      />
    </MapContainer>
  );
}
