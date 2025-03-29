// src/constants/defaultMap.ts

export const defaultMap = {
  style: "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json",
    center: [144.9631, -37.8136] as [number, number], // Melbourne's coordinates [longitude, latitude]
    zoom: 12, // Default zoom level to focus on Melbourne
    layers: [],
    permissions: true,
  };