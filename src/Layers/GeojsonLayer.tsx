import * as maplibregl from "maplibre-gl";

// Generic GeoJSON layer handler
export const GeojsonLayer = (layer: any, map: maplibregl.Map) => {
  if (!layer.source || !layer.source.data) {
    console.error("GeoJSON layer missing source data");
    return;
  }

  // Add GeoJSON source to map if it doesn't exist
  if (!map.getSource(layer.id)) {
    map.addSource(layer.id, {
      type: "geojson",
      data: layer.source.data, // Use the GeoJSON data passed into the layer
    });
  }

  // Check the type of geometry in the GeoJSON and add appropriate layer
  if (!map.getLayer(layer.id)) {
    switch (layer.source.data.geometry.type) {
      case "Point":
        map.addLayer({
          id: layer.id,
          type: "circle", // For point geometries, use 'circle' layer
          source: layer.id,
          paint: {
            "circle-radius": layer.paint?.["circle-radius"] || 10, // Radius in pixels
            "circle-color": layer.paint?.["circle-color"] || "#FF0000", // Circle color
            "circle-stroke-width": layer.paint?.["circle-stroke-width"] || 2,
            "circle-stroke-color": layer.paint?.["circle-stroke-color"] || "#FFFFFF", // Circle stroke color
          },
        });
        break;

      case "Polygon":
        map.addLayer({
          id: layer.id,
          type: "fill", // For polygon geometries, use 'fill' layer
          source: layer.id,
          paint: {
            "fill-color": layer.paint?.["fill-color"] || "#FF0000", // Default fill color
            "fill-opacity": layer.paint?.["fill-opacity"] || 0.3,   // Default fill opacity
            "fill-outline-color": layer.paint?.["fill-outline-color"] || "#FF0000", // Outline color
          },
        });
        break;

      case "LineString":
        map.addLayer({
          id: layer.id,
          type: "line", // For line geometries, use 'line' layer
          source: layer.id,
          paint: {
            "line-color": layer.paint?.["line-color"] || "#FF0000", // Line color
            "line-width": layer.paint?.["line-width"] || 2,          // Line width
            "line-opacity": layer.paint?.["line-opacity"] || 1,      // Line opacity
          },
        });
        break;

      default:
        console.error("Unsupported geometry type:", layer.source.data.geometry.type);
        return;
    }
  }
};