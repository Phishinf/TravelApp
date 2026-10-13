import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PaulJourneyStage } from '../../types';

interface JourneyMapProps {
  journey: PaulJourneyStage;
  selectedStopIndex: number | null;
  onSelectStop: (index: number) => void;
}

// Numbered circular marker; stops sharing a location (e.g. revisits) are merged into one marker.
const markerIcon = (label: string, active: boolean) =>
  L.divIcon({
    className: '',
    html: `<div style="min-width:22px;height:22px;padding:0 5px;border-radius:11px;display:flex;align-items:center;justify-content:center;font:700 11px/1 system-ui,sans-serif;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.6);${
      active
        ? 'background:#f59e0b;color:#0f172a;border:2px solid #fff;'
        : 'background:#0f172a;color:#fbbf24;border:2px solid #f59e0b;'
    }">${label}</div>`,
    iconSize: undefined,
    iconAnchor: [11, 11],
  });

export const JourneyMap: React.FC<JourneyMapProps> = ({ journey, selectedStopIndex, onSelectStop }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  // Create the map once
  useEffect(() => {
    if (!containerRef.current) return;
    const map = L.map(containerRef.current, { scrollWheelZoom: false, worldCopyJump: false });
    const esri = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas';
    L.tileLayer(`${esri}/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`, {
      attribution: 'Tiles &copy; <a href="https://www.esri.com">Esri</a> &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors',
      maxZoom: 12,
    }).addTo(map);
    L.tileLayer(`${esri}/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}`, { maxZoom: 12 }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Fit the whole route when the journey changes
  useEffect(() => {
    const map = mapRef.current;
    const points = (journey.routeCoords ?? []).flat();
    if (map && points.length) map.fitBounds(L.latLngBounds(points), { padding: [30, 30] });
  }, [journey]);

  // Draw route line and markers
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.clearLayers();
    const coords = journey.routeCoords ?? [];

    L.polyline(coords.flat(), { color: '#f59e0b', weight: 3, opacity: 0.85, dashArray: '6 6' }).addTo(layer);

    const byLocation = new Map<string, { latlng: [number, number]; stops: number[] }>();
    coords.forEach((points, stopIdx) =>
      points.forEach((latlng) => {
        const key = latlng.join(',');
        const entry = byLocation.get(key) ?? { latlng, stops: [] };
        if (!entry.stops.includes(stopIdx)) entry.stops.push(stopIdx);
        byLocation.set(key, entry);
      })
    );

    byLocation.forEach(({ latlng, stops }) => {
      const active = selectedStopIndex !== null && stops.includes(selectedStopIndex);
      L.marker(latlng, {
        icon: markerIcon(stops.map((i) => i + 1).join(' · '), active),
        zIndexOffset: active ? 1000 : 0,
      })
        .bindTooltip(stops.map((i) => `${i + 1}. ${journey.route[i]}`).join('<br/>'), { direction: 'top', offset: [0, -10] })
        .on('click', () => onSelectStop(stops[stops.length - 1]))
        .addTo(layer);
    });
  }, [journey, selectedStopIndex, onSelectStop]);

  // Pan to the selected stop
  useEffect(() => {
    const map = mapRef.current;
    if (!map || selectedStopIndex === null) return;
    const points = journey.routeCoords?.[selectedStopIndex] ?? [];
    if (points.length === 1) map.flyTo(points[0], Math.max(map.getZoom(), 7), { duration: 0.8 });
    else if (points.length > 1) map.flyToBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 8, duration: 0.8 });
  }, [journey, selectedStopIndex]);

  return (
    <div
      ref={containerRef}
      className="h-72 sm:h-96 w-full rounded-xl border border-slate-800 overflow-hidden bg-slate-950 z-0"
      role="region"
      aria-label={`${journey.journeyNameZh} 路線地圖`}
    />
  );
};
