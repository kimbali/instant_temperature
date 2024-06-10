import { LoaderFunction, json } from '@remix-run/node';
import { useState } from 'react';
import CurrentTemperature from '~/components/temperature/CurrentTemperature';
import ForecastComponent from '~/components/temperature/Forecast';
import TrendComponent from '~/components/temperature/Trend';
import { Title } from '~/components/text';
import { Tomorrow } from '~/services/api/tomorrow';
import { ClientOnly } from 'remix-utils/client-only';
import type { LatLngExpression } from 'leaflet';
import { Map } from '~/components/map/map.client';

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

export const loader: LoaderFunction = async () => {
  const resForecast = await tomorrowCtrl.getForecast({
    lat: '42.3478',
    long: '-71.0466',
  });

  const resTrend = await tomorrowCtrl.getTrend({
    lat: '42.3478',
    long: '-71.0466',
  });

  if (resForecast.error || resTrend.error) {
    return json(
      { error: `${resForecast.error.message} // ${resTrend.error}` },
      { status: resForecast.error.status || resTrend.error.status }
    );
  }

  return {
    currentTemperature: resForecast.currentTemperature,
    forecast: resForecast.forecast,
    trend: resTrend,
  };
};

export default function TemperaturePage() {
  const mapHeight = '400px';
  const [selectedLocation, setSelectedLocation] = useState<LatLngExpression>({
    lat: 41.38694691885317,
    lng: 2.1676698133663157,
  });

  const handleSelect = (location: LatLngExpression) => {
    const { lat, lng } = location;

    const coords = { lat, lng };

    setSelectedLocation(coords);
  };

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
    </div>
  );
}
