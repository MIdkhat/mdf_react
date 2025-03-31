import { Layer, MapState } from "../context/MapContext";

const baseMaps = {
  openStreet:  "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json",
}

const MelbourneCoords: [number, number] = [144.9631, -37.8136]

// src/constants/defaultMap.ts
export const searchRadiusOptions = [5, 10, 50, 100]

const createCirclePolygon = (center: [number, number], radius: number, points: number = 64) => {
  const coords = [];
  const angleStep = (2 * Math.PI) / points;

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep;
    const dx = radius * Math.cos(angle);
    const dy = radius * Math.sin(angle);
    coords.push([center[0] + dx, center[1] + dy]);
  }

  return coords;
};

// Constants for layers
const searchCenter: Layer = {
  id: "search-center-marker", // New marker layer for the search center
  type: "geojson" as const,
  source: {
    type: "geojson" as const,
    data: {
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: MelbourneCoords,  // Initial search center coordinates
      },
      properties: {},
    },
  },
  paint: {
    "circle-radius": 8,
    "circle-color": "#ff0000", // Red color for the center marker
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff", // White stroke for visibility
  },
};

const searchRadius = searchRadiusOptions[0] * 1000; // Search radius in meters (5 km converted to meters)
const searchArea: Layer = {
  id: "search-area",
  type: "geojson" as const,
  source: {
    type: "geojson" as const,
    data: {
      type: "Feature" as const,
      geometry: {
        type: "Polygon" as const,
        coordinates: [createCirclePolygon(MelbourneCoords, searchRadius)],  // Dynamically created circle as polygon
      },
      properties: {},
    },
  },
  paint: {
    "fill-color": "#ff0000", // Red color for the fill
    "fill-outline-color": "#ff0000", // Outline color for the polygon
  },
};

// Example of layers stored as objects
export const defaultMap: MapState = {
  style: baseMaps.openStreet,
  center: MelbourneCoords,
  zoom: 12,
  layers: [
    searchCenter,
    // searchArea,
  ],
  permissions: true,
  searchCenter: MelbourneCoords,
  searchRadius: searchRadiusOptions[0],
};
