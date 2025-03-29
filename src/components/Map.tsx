import React, { useEffect, useRef } from "react"
import * as maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { useMapState } from "../context/MapContext" // Import context hook
import RightTopMenu from "./RightTopMenu"

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const { mapState, mapController } = useMapState();

  useEffect(() => {
    if (!mapContainerRef.current) return

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapState.style,
      center: mapState.center,
      zoom: mapState.zoom,
    })

    mapController.setMap(map)

    return () => map.remove() // Cleanup on unmount
  }, []) // ✅ Run only once, not on every mapState change

  return (
    <div ref={mapContainerRef} style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <RightTopMenu/>
    </div>
  )
}

export default Map
