import React, { useEffect, useRef, useState } from "react"
import * as maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { useMapState } from "../context/MapContext"
import RightTopMenu from "./RightTopMenu"
import InfoModal from "./InfoPopup"

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const { mapState, mapController, mapRef } = useMapState()
  const [isMapReady, setIsMapReady] = useState(false) // Track if map is ready

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    console.log("Initializing map")

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapState.style,
      center: mapState.searchCenter,
      zoom: mapState.zoom,
    })

    mapRef.current = map

    map.on("load", () => {
      console.log("Map loaded")
      setIsMapReady(true) // ✅ Trigger re-render when map is ready
    })

    map.on("click", (event) => {
      // console.log("Map clicked at:", event.lngLat)
      mapController.handleMapClick(event.lngLat)
    })

    return () => {
      console.log("Cleaning up map")
      map.remove()
      mapRef.current = null
      setIsMapReady(false)
    }
  }, [])

  useEffect(() => {
    if (isMapReady) {
      mapController.loadLayers(); // Load layers when map is ready
    }
  }, [isMapReady, mapController]);

  return (
    <div ref={mapContainerRef} style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <RightTopMenu />
      {mapState.isPopupOpen && <InfoModal />}
    </div>
  )
}

export default Map
