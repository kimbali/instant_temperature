import { LatLngEx } from "~/utils/types";

export class GeoLocation {
  async getLocationName({ lat, lng }: LatLngEx) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      
      const data = await response.json();

      if (data && data.address) {
        return (
          data.address.city ||
          data.address.town ||
          data.address.village ||
          'Unknown location'
        );
      } 

      return 'Unknown location';
    } catch (error) {
      console.error('Error fetching location:', error);

      return 'Unknown location';
    }
  }
}
