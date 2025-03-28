import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMapState } from "../context/MapContext";

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapState] = useMapState(); // Access map state from context

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapState.style, // Use style from map state
      center: mapState.center, // Use center from map state
      zoom: mapState.zoom, // Use zoom level from map state
    });

    return () => map.remove(); // Cleanup on unmount
  }, [mapState]); // Reinitialize the map whenever mapState changes

  return <div ref={mapContainerRef} style={{ width: "100vw", height: "100vh"}} />;
};

export default Map;