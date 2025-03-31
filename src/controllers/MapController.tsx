import * as maplibregl from "maplibre-gl"
import { MapState } from "../context/MapContext"
import { RefObject } from "react"
import { GeojsonLayer } from "../Layers/GeojsonLayer"

export class MapController {
  private setMapState: React.Dispatch<React.SetStateAction<MapState>>
  private mapRef: RefObject<maplibregl.Map | null>

  constructor(setMapState: React.Dispatch<React.SetStateAction<MapState>>, mapRef: RefObject<maplibregl.Map | null>) {
    this.setMapState = setMapState
    this.mapRef = mapRef
  }

  get map(): maplibregl.Map | null {
    return this.mapRef.current
  }
  // Method to update an existing layer with new source and paint properties
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
        const paintValue = layer.paint[paintProperty as keyof typeof layer.paint]
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

  handleMapClick = (lngLat: maplibregl.LngLat) => {
    console.log("Handling map click:", lngLat);

    this.setMapState((prevState: MapState) => {
      const updatedSearchCenter: [number, number] = [lngLat.lng, lngLat.lat];

      // Make sure to return a new state object to trigger re-render
      const updatedState = {
        ...prevState,
        searchCenter: updatedSearchCenter,
        // It's important to trigger a re-render by updating the layers if necessary
        layers: prevState.layers.map(layer => {
          if (layer.id === 'search-center-marker') {
            return {
              ...layer,
              source: {
                ...layer.source,
                data: {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: updatedSearchCenter,
                  },
                  properties: {},
                },
              },
            };
          }
          return layer;
        }),
      };

      return updatedState;
    });
  };
}
