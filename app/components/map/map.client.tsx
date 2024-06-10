import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { Text } from '../text';

export function Map({
  height,
  handleSelect,
  position,
}: {
  height: string;
  handleSelect: (latlng: LatLngExpression) => void;
  position: LatLngExpression;
}) {
  const LocationMarker = () => {
    const map = useMapEvents({
      click(event) {
        handleSelect(event.latlng);
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    );
  };

  return (
    <div style={{ height }} className='mb-10'>
      <MapContainer
        style={{
          height: '100%',
        }}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <LocationMarker />
      </MapContainer>

      <Text>
        <span>Lat: {position?.lat}</span>, Lng: <span>{position?.lng}</span>
      </Text>
    </div>
  );
}
