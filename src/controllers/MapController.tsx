import { MapState } from "../context/MapContext"

export class MapController {
  private setMapState: React.Dispatch<React.SetStateAction<MapState>>
  private mapInstance: maplibregl.Map | null = null

  constructor(setMapState: React.Dispatch<React.SetStateAction<MapState>>) {
    this.setMapState = setMapState
  }

  // Method to set map instance (Call this in Map.tsx after initializing the map)
  setMap(map: maplibregl.Map) {
    this.mapInstance = map
  }

  handleFindMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        this.smoothMoveTo([longitude, latitude], 16, 800)
      })
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  smoothMoveTo = (targetCenter: [number, number], targetZoom: number, duration: number) => {
    if (!this.mapInstance) return

    this.mapInstance.flyTo({
      center: targetCenter,
      zoom: targetZoom,
      essential: true, // Ensures smooth animation
      duration, // Duration in milliseconds
    })
  }

  toggleCouncils = () => {
    console.log("toggleCouncils")
  }

  toggleParksVic = () => {
    console.log("toggleParksVic")
  }

  toggleDroneSpots = () => {
    console.log("toggleDroneSpots")
  }

  zoomIn = () => {
    this.setMapState((prevState: MapState) => ({
      ...prevState,
      zoom: prevState.zoom + 1,
    }))
  }

  zoomOut = () => {
    this.setMapState((prevState: MapState) => ({
      ...prevState,
      zoom: Math.max(prevState.zoom - 1, 1), // Prevent negative zoom
    }))
  }

  resetView = () => {
    this.smoothMoveTo([0, 0], 3, 700) // Reset view smoothly
  }
}
