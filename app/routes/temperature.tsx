import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node';
import { useEffect, useState } from 'react';
import CurrentTemperature from '~/components/temperature/CurrentTemperature';
import ForecastComponent from '~/components/temperature/Forecast';
import TrendComponent from '~/components/temperature/Trend';
import { Text, Title } from '~/components/text';
import { Tomorrow } from '~/services/api/tomorrow';
import { ClientOnly } from 'remix-utils/client-only';
import type { LatLngExpression } from 'leaflet';
import { Map } from '~/components/map/map.client';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { commitSession, getSession } from '~/services/session.server';

export interface OneDay {
  day: string;
  date: string;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
}

export interface TemperatureDate {
  currentTemperature: number;
  forecast: OneDay[];
  trend: OneDay[];
}

const tomorrowCtrl = new Tomorrow();

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('cookie'));
  const latitude = session.get('latitude');
  const longitude = session.get('longitude');

  const resForecast = await tomorrowCtrl.getForecast({
    lat: '42.3478',
    long: '-71.0466',
  });

  const resTrend = await tomorrowCtrl.getTrend({
    lat: latitude || '42.3478',
    long: longitude || '-71.0466',
  });

  if (resForecast.error || resTrend.error) {
    return json(
      { error: `${resForecast.error.message} // ${resTrend.error}` },
      { status: resForecast.error.status || resTrend.error.status }
    );
  }

  return json({
    currentTemperature: resForecast.currentTemperature,
    forecast: resForecast.forecast,
    trend: resTrend,
    latitude,
    longitude,
  });
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
  const { latitude, longitude } = useLoaderData<typeof loader>();

  const [selectedLocation, setSelectedLocation] = useState<LatLngExpression>({
    lat: latitude || 41.38694691885317,
    lng: longitude || 2.1676698133663157,
  });

  const updatePosition = ({ latitude, longitude }) => {
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

      <CurrentTemperature />

      <ForecastComponent />

      <TrendComponent />

      <ClientOnly
        fallback={
          <div
            id='skeleton'
            style={{ height: mapHeight, background: '#d1d1d1' }}
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

      <Text>
        <span>Lat: {latitude}</span>, Lng: <span>{longitude}</span>
      </Text>
    </div>
  );
}
