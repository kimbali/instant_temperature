import { LatLngEx } from "~/utils/types";

/**
 * Class to interact with geolocation services to fetch location names.
 */
export class GeoLocation {
  /**
   * Fetches the location name from latitude and longitude using OpenStreetMap's Nominatim API.
   * @param {LatLngEx} param0 - Object containing latitude and longitude.
   * @returns {Promise<string>} - The name of the location or 'Unknown location' if not found.
   */
  async getLocationName({ lat, lng }: LatLngEx): Promise<string> {
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
