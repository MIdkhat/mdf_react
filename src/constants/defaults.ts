import { Layer, MapState } from "../context/MapContext";
import { createCirclePolygon } from "../utils";

const baseMaps = {
  openStreet: "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json",
}

const MelbourneCoords: [number, number] = [144.9631, -37.8136]

// src/constants/defaultMap.ts
export const searchRadiusOptions = [5, 10, 50, 100]

const defaultCStyles = {
  searchCenter: {
    "circle-radius": 4, // Scale value used here instead of 8
    "circle-color": "#003366", // Fill color for the center marker (from 'fillColor')
    "circle-stroke-width": 2,
    "circle-stroke-color": "#003366", // Stroke color for visibility (from 'strokeColor')
  },
  searchArea: {
    "fill-color": "#3399cc", // Fill color for the polygon (from 'fillColor')
    "fill-opacity": 0.2, // Fill opacity (from 'fillOpacity')
    "fill-outline-color": "#003366", // Outline color (from 'strokeColor')
    // "stroke-color": "#003366", // Stroke color (from 'strokeColor')
    // "stroke-opacity": 0.8, // Stroke opacity (from 'strokeOpacity')
    // "stroke-width": 0.6, // Stroke width (from 'strokeWeight')
  },
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
  paint: defaultCStyles.searchCenter,
};

const searchRadius = searchRadiusOptions[0]; // Search radius in meters (5 km converted to meters)
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
  paint: defaultCStyles.searchArea,
};

// Example of layers stored as objects
export const defaultMap: MapState = {
  style: baseMaps.openStreet,
  center: MelbourneCoords,
  zoom: 12,
  layers: [
    searchCenter,
    searchArea,
  ],
  permissions: true,
  searchCenter: MelbourneCoords,
  searchRadius: searchRadiusOptions[0],
  isPopupOpen: false,
};
