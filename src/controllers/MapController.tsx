import * as maplibregl from "maplibre-gl"
import { MapState, useMapState } from "../context/MapContext"
import { GeojsonLayer } from "../Layers/GeojsonLayer"
import { createCirclePolygon } from "../utils"

export class MapController {
  private setMapState: React.Dispatch<React.SetStateAction<MapState>>
  private mapRef: React.RefObject<maplibregl.Map | null>
  private mapState: MapState

  constructor(
    setMapState: React.Dispatch<React.SetStateAction<MapState>>,
    mapRef: React.RefObject<maplibregl.Map | null>,
    mapState: MapState,
  ) {
    this.setMapState = setMapState
    this.mapRef = mapRef
    this.mapState = mapState
  }

  get map(): maplibregl.Map | null {
    return this.mapRef.current
  }

  updateLayer = (layer: any, map: maplibregl.Map) => {
    const existingLayer = map.getLayer(layer.id)

    if (!existingLayer) {
      console.error(`Layer with ID ${layer.id} does not exist on the map.`)
      return
    }

    // Update the source data if it exists
    const source = map.getSource(layer.id) as maplibregl.GeoJSONSource
    if (source && source.setData) {
      source.setData(layer.source.data) // Update the GeoJSON data for the layer
    } else {
      console.warn(`No source found for layer ${layer.id}`)
    }

    // Update the paint properties if they exist
    if (layer.paint) {
      Object.keys(layer.paint).forEach((paintProperty) => {
        // console.log(layer)
        const paintValue = layer.paint[paintProperty as keyof typeof layer.paint]
        // console.log("paintProperty paintValue", paintProperty, paintValue)
        if (paintValue !== undefined) {
          map.setPaintProperty(layer.id, paintProperty, paintValue)
        }
      })
    }
  }

  // Updated loadLayers function that utilizes the updateLayer method
  loadLayers = () => {
    const map = this.map
    if (!map) return

    this.setMapState((prevState: MapState) => {
      prevState.layers.forEach((layer) => {
        // Check if the layer already exists on the map
        if (map.getLayer(layer.id)) {
          console.log(`Updating layer ${layer.id}`)
          this.updateLayer(layer, map) // Update the existing layer
          return
        }

        // Add new layer if it doesn't exist
        switch (layer.type) {
          case "geojson":
            GeojsonLayer(layer, map) // Call the GeojsonLayer function to add the layer
            break
          default:
            console.warn(`Unsupported layer type: ${layer.type}`)
        }
      })

      return prevState
    })
  }

  handleFindMe = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const newCenter: [number, number] = [longitude, latitude]
        console.log("Got user location:", newCenter)

        this.setMapState((prevState: MapState) => ({
          ...prevState,
          searchCenter: newCenter,
          center: newCenter,
        }))

        this.flyTo(newCenter, 16, 800)
      },
      (error) => {
        console.error("Error getting location:", error)
      },
    )
  }

  flyTo = (center: [number, number], zoom: number, duration: number) => {
    console.log("flyTo to:", center, "zoom:", zoom)
    if (this.mapRef.current) {
      this.mapRef.current.flyTo({
        center: center,
        zoom: zoom,
        duration: duration,
      })
    } else {
      console.error("No map instance available for flyTo")
    }
  }


  handleRadiusUpdate = (searchRadius: number) => {
    console.log("Handling radius update:", searchRadius)
    // Update the map state to change the search center and search area
    this.setMapState((prevState: MapState) => {
      return {
        ...prevState,
        searchRadius,
      }
    })

    this.updateSearchArea(this.mapState.searchCenter, searchRadius)
  }

  handleMapClick = (lngLat: maplibregl.LngLat) => {
    console.log("Handling map click:", lngLat)
    const searchCenter: [number, number] = [lngLat.lng, lngLat.lat]
    // Update the map state to change the search center and search area
    this.setMapState((prevState: MapState) => {
      return {
        ...prevState,
        searchCenter,
      }
    })

    this.updateSearchArea(searchCenter, this.mapState.searchRadius)
  }

  updateSearchArea = (searchCenter: [number, number], searchRadius: number) => {
    console.log("Updating search area with center:", searchCenter, "and radius:", searchRadius)

    const searchAreaCoords = createCirclePolygon(searchCenter, searchRadius, 64)

    this.setMapState((prevState: MapState) => ({
      ...prevState,
      layers: prevState.layers.map((layer) => {
        if (layer.id === "search-center-marker") {
          return {
            ...layer,
            source: {
              ...layer.source,
              data: {
                type: "Feature" as const,
                geometry: { type: "Point" as const, coordinates: searchCenter },
                properties: {},
              },
            },
          }
        }

        if (layer.id === "search-area") {
          return {
            ...layer,
            source: {
              ...layer.source,
              data: {
                type: "Feature" as const,
                geometry: { type: "Polygon" as const, coordinates: [searchAreaCoords] },
                properties: {},
              },
            },
          }
        }

        return layer
      }),
    }))
  }
}
