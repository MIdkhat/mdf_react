import React, { createContext, useContext, useState } from "react";
import { defaultMap } from "../constants/defaultMap"; // Import the defaultMap from constants

// Define the types of map state
interface MapState {
  style: string; // Base map style URL
  center: [number, number]; // Map center [longitude, latitude]
  zoom: number; // Zoom level
  layers: string[]; // Layers to display on the map
  permissions: boolean; // Map interaction permissions (e.g., can move/zoom)
}

// Create the context with default values
const MapContext = createContext<[MapState, React.Dispatch<React.SetStateAction<MapState>>]>([
  defaultMap,
  () => {},
]);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mapState, setMapState] = useState<MapState>(defaultMap); // Use defaultMap as initial state

  return (
    <MapContext.Provider value={[mapState, setMapState]}>
      {children}
    </MapContext.Provider>
  );
};

// Custom hook to use the MapContext
export const useMapState = () => useContext(MapContext);