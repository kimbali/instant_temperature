import { LoaderFunction, json } from '@remix-run/node';
import CurrentTemperature from '~/components/temperature/CurrentTemperature';
import ForecastComponent from '~/components/temperature/Forecast';
import { Title } from '~/components/text';
import { Tomorrow } from '~/services/api/tomorrow';
import { formatDate, formatDay } from '~/utils/formatDate';

export interface Forecast {
  day: string;
  date: string;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
}

export interface TemperatureDate {
  currentTemperature: number;
  forecast: Forecast[];
}

const tomorrowCtrl = new Tomorrow();

export const loader: LoaderFunction = async () => {
  const response = await tomorrowCtrl.getForecast({
    lat: '42.3478',
    long: '-71.0466',
  });

  if (response.error) {
    return json(
      { error: response.error.message },
      { status: response.error.status }
    );
  }

  const forecast: Forecast[] = response.timelines?.daily.map(element => {
    return {
      day: formatDay(element.time),
      date: formatDate(element.time),
      temperatureAvg: Math.round(element.values.temperatureAvg),
      temperatureMax: Math.round(element.values.temperatureMax),
      temperatureMin: Math.round(element.values.temperatureMin),
    };
  });

  const data = {
    currentTemperature: Math.round(
      response.timelines?.minutely[0]?.values.temperature
    ),
    forecast,
  };

  return data;
};

export default function TemperaturePage() {
  return (
    <div className='w-full'>
      <Title>Instant temperature</Title>

      <CurrentTemperature />

      <ForecastComponent />

      {/* <TrendComponent /> */}
    </div>
  );
}
