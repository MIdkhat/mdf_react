// geojsonApi.ts
export interface GeojsonData {
    id: string;
    name: string;
    email: string;
    fly: string | null;
    description: string;
    position: string; // Can be expanded depending on how the position is represented
  }

  export const fetchParks = async (
    searchCenter: [number, number], // [lat, lng]
    radius: number
  ): Promise<GeojsonData[] | null> => {
    const url = 'https://melbournedroneflyers.org/mdf-api/index.php';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          action: 'getParksData',
          operation: 'fetchParks',
          lat: searchCenter[0].toString(),
          lng: searchCenter[1].toString(),
          radius: radius.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch geojson data');
      }

      return await response.json();
    } catch (error) {
      console.error('Error loading geojson data:', error);
      return null;
    }
  };