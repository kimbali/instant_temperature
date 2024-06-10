import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from '@remix-run/node';
import { useEffect, useState } from 'react';
import CurrentTemperature from '~/components/temperature/CurrentTemperature';
import ForecastComponent from '~/components/temperature/Forecast';
import TrendComponent from '~/components/temperature/Trend';
import { Title } from '~/components/text';
import { Tomorrow } from '~/services/api/tomorrow';
import { ClientOnly } from 'remix-utils/client-only';
import type { LatLngExpression } from 'leaflet';
import { Map } from '~/components/map/map.client';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { commitSession, getSession } from '~/services/session.server';
import { GeoLocation } from '~/services/api/geolocation';

export interface OneDay {
  day: string;
  date: string;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
}

export interface TemperatureDate {
  currentTemperature: number;
  geoLocation: string;
  forecast: OneDay[];
  trend: OneDay[];
  latitude: number;
  longitude: number;
}

export interface LatLng {
  latitude: number;
  longitude: number;
}

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

const tomorrowCtrl = new Tomorrow();
const geoLocationCtrl = new GeoLocation();

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('cookie'));
  const latitude = session.get('latitude');
  const longitude = session.get('longitude');

  const latLng = {
    lat: latitude || 41.38694691885317,
    lng: longitude || 2.1676698133663157,
  };

  if (latitude && longitude) {
    const resForecast = await tomorrowCtrl.getForecast(latLng);
    const resTrend = await tomorrowCtrl.getTrend(latLng);
    const geoLocation = await geoLocationCtrl.getLocationName(latLng);

    if (resForecast.error || resTrend.error || geoLocation.error) {
      return json(
        {
          error: `${resForecast.error.message} // ${resTrend.error.message} // ${geoLocation.error.message}`,
        },
        { status: resForecast.error.status || resTrend.error.status }
      );
    }

    return json({
      currentTemperature: resForecast.currentTemperature,
      forecast: resForecast.forecast,
      trend: resTrend,
      latitude,
      longitude,
      geoLocation,
    });
  }

  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const coords = await request.json();
  const session = await getSession(request.headers.get('cookie'));
  session.set('latitude', coords.latitude);
  session.set('longitude', coords.longitude);

  return json(
    { success: true },
    { headers: { 'set-cookie': await commitSession(session) } }
  );
}

export default function TemperaturePage() {
  const mapHeight = '400px';
  const data = useLoaderData<typeof loader>();

  const [selectedLocation, setSelectedLocation] = useState<LatLngExpression>({
    lat: data?.latitude,
    lng: data?.longitude,
  });

  const updatePosition = ({ latitude, longitude }: LatLng) => {
    setSelectedLocation({ lat: latitude, lng: longitude });
    fetcher.submit(
      { latitude, longitude },
      { method: 'post', encType: 'application/json' }
    );
  };

  const handleSelect = (location: LatLngExpression) => {
    const { lat, lng } = location;
    updatePosition({ latitude: lat, longitude: lng });
  };

  const fetcher = useFetcher();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      updatePosition({ latitude, longitude });
    });
  }, []);

  return (
    <div className='pb-16 w-full'>
      <Title>Instant temperature</Title>

      <ClientOnly
        fallback={
          <div
            id='skeleton'
            style={{
              height: mapHeight,
              background: '#d1d1d1',
            }}
          />
        }
      >
        {() => (
          <Map
            height={mapHeight}
            handleSelect={handleSelect}
            position={selectedLocation}
          />
        )}
      </ClientOnly>

      <CurrentTemperature />

      <ForecastComponent />

      <TrendComponent />
    </div>
  );
}
