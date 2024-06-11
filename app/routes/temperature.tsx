import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { useEffect, useState } from 'react';
import MinMaxTemperatures from '~/components/temperature/MinMaxTemperatures';
import { Tomorrow } from '~/services/api/tomorrow';
import { ClientOnly } from 'remix-utils/client-only';
import { Map } from '~/components/map/map.client';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { commitSession, getSession } from '~/services/session.server';
import { GeoLocation } from '~/services/api/geolocation';
import TemperatureChart from '~/components/chart/TemperatureChart';
import { LatLngEx, TemperatureDate } from '~/utils/types';
import { Button } from '~/components/button/Button';
import { Subtitle } from '~/components/text/Subtitle';
import { Title } from '~/components/text/Title';
import { ENV } from '~/utils';
import { Text } from '~/components/text/Text';

const tomorrowCtrl = new Tomorrow();
const geoLocationCtrl = new GeoLocation();

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const session = await getSession(request.headers.get('cookie'));
    const token = session.get('token');

    if (!token) {
      return redirect(ENV.ROUTES.HOME);
    }

    const latitude = session.get('latitude') || 41.38694691885317;
    const longitude = session.get('longitude') || 2.1676698133663157;

    const latLng = { lat: latitude, lng: longitude };

    const [resForecast, resTrend, geoLocation] = await Promise.all([
      tomorrowCtrl.getForecast(latLng),
      tomorrowCtrl.getTrend(latLng),
      geoLocationCtrl.getLocationName(latLng),
    ]);

    if (resForecast.error || resTrend.error || !geoLocation) {
      return json({ error: 'Error while fetching data' });
    }

    return json({
      currentTemperature: resForecast.currentTemperature,
      forecast: resForecast.forecast,
      trend: resTrend,
      latitude,
      longitude,
      geoLocation,
    });
  } catch (error) {
    console.error('Error in loader:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
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
  const data = useLoaderData<TemperatureDate>();
  const [showTrend, setShowTrend] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<LatLngEx>({
    lat: data?.latitude,
    lng: data?.longitude,
  });

  const updatePosition = ({ lat, lng }: LatLngEx) => {
    setSelectedLocation({ lat, lng });
    fetcher.submit(
      { latitude: lat, longitude: lng },
      { method: 'post', encType: 'application/json' }
    );
  };

  const handleSelect = (location: LatLngEx) => {
    updatePosition(location);
  };

  const fetcher = useFetcher();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      updatePosition({ lat: latitude, lng: longitude });
    });
  }, []);

  if (!data) return null;
  return (
    <div className='pb-16 max-w-screen-lg mx-auto'>
      <div className='flex flex-col items-center lg:items-start'>
        <div className='w-full text-center'>
          <Title>Instant temperature</Title>
        </div>

        <Text className='w-full text-center mb-10 text-cyan-500 text-xl'>
          Select a point on the map to get the current temperature, the trend of
          the last week and the location forecast for the following days
        </Text>

        <div className='flex flex-col lg:flex-row w-full lg:justify-between mb-8'>
          <div className='w-full lg:order-1 mb-4 lg:w-1/2 lg:order-none map self-center lg:self-auto mb-8'>
            <ClientOnly
              fallback={
                <div
                  className='w-full mr-3'
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
          </div>

          <div className='w-full lg:order-2 lg:w-1/2 lg:order-none temperature flex flex-col justify-center items-center'>
            <Subtitle>
              {showTrend ? 'Trend' : 'Forecast'} in {data.geoLocation}
            </Subtitle>

            <div className='flex mb-3'>
              <Button
                onClick={() => setShowTrend(true)}
                primary
                disabled={showTrend}
              >
                Trend
              </Button>
              <Button
                onClick={() => setShowTrend(false)}
                primary
                disabled={!showTrend}
              >
                Forecast
              </Button>
            </div>

            <TemperatureChart data={showTrend ? data.trend : data.forecast} />
            <MinMaxTemperatures data={showTrend ? data.trend : data.forecast} />
          </div>
        </div>
      </div>
    </div>
  );
}
