import React, { createContext, useContext, useState } from "react";
import { defaultMap } from "../constants/defaultMap";
import { MapController } from "../controllers/MapController";

// Define the types of map state
export interface MapState {
  style: string;
  center: [number, number];
  zoom: number;
  layers: string[];
  permissions: boolean;
}

// Define the full context type
type MapContextType = {
  mapState: MapState;
  mapController: MapController;
};

// Create the context
const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mapState, setMapState] = useState<MapState>(defaultMap);
  const mapController = new MapController(setMapState); // Instantiate controller

  return (
    <MapContext.Provider value={{ mapState, mapController }}>
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