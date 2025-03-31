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

  updateMapState = (newState: MapState) => {
    this.mapState = newState;
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

    const source = map.getSource(layer.id) as maplibregl.GeoJSONSource
    if (source && source.setData) {
      source.setData(layer.source.data) // Update the GeoJSON data for the layer
    } else {
      console.warn(`No source found for layer ${layer.id}`)
    }

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

  loadLayers = () => {
    const map = this.map
    if (!map) return

    this.setMapState((prevState: MapState) => {
      prevState.layers.forEach((layer) => {
        if (map.getLayer(layer.id)) {
          // console.log(`Updating layer ${layer.id}`)
          this.updateLayer(layer, map) // Update the existing layer
          return
        }
        switch (layer.type) {
          case "geojson":
            GeojsonLayer(layer, map)
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
        const searchCenter: [number, number] = [longitude, latitude]

        this.setMapState((prevState: MapState) => {
          const newState = {
            ...prevState,
            searchCenter,
          }
          this.updateSearchArea(newState.searchCenter, newState.searchRadius)

          this.flyTo(searchCenter, 16, 800)

          return newState
        })
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
    this.setMapState((prevState: MapState) => {
      const newState = {
        ...prevState,
        searchRadius,
      }
      this.updateSearchArea(newState.searchCenter, newState.searchRadius)
      return newState
    })
  }

  handleMapClick = (lngLat: maplibregl.LngLat) => {
    const searchCenter: [number, number] = [lngLat.lng, lngLat.lat]

    this.setMapState((prevState: MapState) => {
      const newState = {
        ...prevState,
        searchCenter,
      }
      this.updateSearchArea(newState.searchCenter, newState.searchRadius)
      return newState
    })
  }

  updateSearchArea = (searchCenter: [number, number], searchRadius: number) => {
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

  handleInfoModal = (isPopupOpen: boolean) => {
    this.setMapState((prevState: MapState) => ({
      ...prevState,
      isPopupOpen: isPopupOpen
    }))
  }
}
