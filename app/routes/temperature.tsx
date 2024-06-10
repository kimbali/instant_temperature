import { LoaderFunction, json } from '@remix-run/node';
import CurrentTemperature from '~/components/temperature/CurrentTemperature';
import ForecastComponent from '~/components/temperature/Forecast';
import TrendComponent from '~/components/temperature/Trend';
import { Title } from '~/components/text';
import { Tomorrow } from '~/services/api/tomorrow';

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
  return (
    <div className='w-full'>
      <Title>Instant temperature</Title>

      <CurrentTemperature />

      <ForecastComponent />

      <TrendComponent />
    </div>
  );
}
