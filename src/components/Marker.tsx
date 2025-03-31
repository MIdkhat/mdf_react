import * as maplibregl from "maplibre-gl";
import React, { useEffect } from "react";
import { useMapState } from "../context/MapContext";

const Marker: React.FC = () => {
  const { mapRef, mapState } = useMapState(); // Use mapRef from context
  const { searchCenter } = mapState;

  useEffect(() => {
    if (!mapRef.current) {
      console.log("Marker: Map is not ready yet.");
      return;
    }

    console.log("Marker: Map found, adding marker.");

    // Create a custom div element for the marker
    const markerElement = document.createElement("div");
    markerElement.style.width = "10px";
    markerElement.style.height = "10px";
    markerElement.style.borderRadius = "50%";
    markerElement.style.backgroundColor = "#FF0000";
    markerElement.style.border = "2px solid #FFFFFF";
    markerElement.style.cursor = "pointer";

    // Add marker to the map
    const marker = new maplibregl.Marker({ element: markerElement })
      .setLngLat(searchCenter)
      .addTo(mapRef.current);

    return () => {
      console.log("Marker: Removing marker.");
      marker.remove();
    };
  }, [mapRef.current, searchCenter]); // Watch for mapRef.current and searchCenter

  return null; // No need to render anything in this component
};

export default Marker;