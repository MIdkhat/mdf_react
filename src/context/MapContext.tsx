import React, { createContext, useContext, useState, useRef, RefObject } from "react";
import * as maplibregl from "maplibre-gl";
import { defaultMap } from "../constants/defaults";
import { MapController } from "../controllers/MapController";

export type Layer = {
  id: string; // Unique ID for the layer
  type: "geojson"; // Type of layer (GeoJSON type in this case)
  source: {
    type: "geojson"; // Data source type
    data: GeoJSON.FeatureCollection; // GeoJSON data (could contain Point, Polygon, etc.)
  };
  paint?: maplibregl.FillLayerSpecification['paint'] | maplibregl.CircleLayerSpecification['paint']; // Optional paint styles
  visibility?: boolean; // Optional visibility toggle
  description?: string; // Optional description
};


// Define the types of map state
export interface MapState {
  style: string;
  center: [number, number];
  zoom: number;
  layers: Layer[];
  permissions: boolean;
  searchCenter: [number, number];
  searchRadius: number;
}

// Define the full context type
type MapContextType = {
  mapRef: RefObject<maplibregl.Map | null>;
  mapState: MapState;
  mapController: MapController;
};

// Create the context
const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mapState, setMapState] = useState<MapState>(defaultMap);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const mapController = new MapController(setMapState, mapRef, mapState);

  return (
    <MapContext.Provider value={{ mapRef, mapState, mapController }}>
      {children}
    </MapContext.Provider>
  );
};

// Custom hook to use the MapContext
export const useMapState = (): MapContextType => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapState must be used within a MapProvider");
  }
  return context;
};