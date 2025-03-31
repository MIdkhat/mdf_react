export const createCirclePolygon = (center: [number, number], radiusKm: number, points: number = 64) => {
  const coords = [];
  const angleStep = (2 * Math.PI) / points;

  // Convert radius from kilometers to degrees
  const latDegreeToKm = 111; // 1 degree latitude = ~111 km
  const lonDegreeToKm = 111 * Math.cos(center[1] * Math.PI / 180); // adjust for the longitude at given latitude

  // Convert radius in kilometers to degrees
  const latRadius = radiusKm / latDegreeToKm;
  const lonRadius = radiusKm / lonDegreeToKm;

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep;
    const dx = lonRadius * Math.cos(angle);  // apply longitude radius
    const dy = latRadius * Math.sin(angle);  // apply latitude radius
    coords.push([center[0] + dx, center[1] + dy]);
  }

  return coords;
};