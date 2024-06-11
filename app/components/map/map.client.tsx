import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

import CurrentTemperature from '../temperature/CurrentTemperature';
import { Text } from '../text/Text';
import { LatLngEx } from '~/utils/types';

export function Map({
  height,
  handleSelect,
  position,
}: {
  height: string;
  handleSelect: (latlng: LatLngEx) => void;
  position: LatLngEx;
}) {
  const LocationMarker = () => {
    useMapEvents({
      click(event) {
        handleSelect({ lat: event.latlng.lat, lng: event.latlng.lng });
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          <Text>
            <span>LAT: {position?.lat}</span>, LNG: <span>{position?.lng}</span>
          </Text>
        </Popup>
      </Marker>
    );
  };

  return (
    <div
      style={{ height }}
      className='relative w-full border border-gray-200 rounded-lg'
    >
      <MapContainer
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '0.5rem',
          zIndex: '0',
        }}
        center={position}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <LocationMarker />
      </MapContainer>

      <Text className='p-2 z-1 text-xs absolute bottom-0 right-0 border border-gray-200 rounded-lg shadow hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700'>
        <span>LAT: {position?.lat}</span>, LNG: <span>{position?.lng}</span>
      </Text>

      <CurrentTemperature />
    </div>
  );
}
