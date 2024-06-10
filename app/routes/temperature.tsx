import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card } from '~/components/card';
import { Text, Title } from '~/components/text';
import { Tomorrow } from '~/services/api/tomorrow';
import { formatDate, formatDay } from '~/utils/formatDate';

interface Forecast {
  day: string;
  date: string;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
}

interface TemperatureDate {
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
  const data: TemperatureDate = useLoaderData();

  return (
    <div className='w-full'>
      <Title>Instant temperature</Title>

      <Card
        title='Current temperature'
        className='w-fit flex flex-col items-center justify-between'
      >
        <Text size='text-7xl'>{data.currentTemperature}ºC</Text>
      </Card>

      <div className='grid auto-rows-auto gap-4 grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] mt-10 w-full'>
        {data.forecast.map((element: Forecast, index: number) => (
          <Card
            key={`forecast${index}`}
            className='ml-3 flex flex-col items-center justify-between'
          >
            <Text color='text-gray-50'>{element.day}</Text>
            <Text className='mb-3'>{element.date}</Text>
            <Text size='text-2xl'>
              <span className='text-cyan-600'>{element.temperatureMin}º</span> -{' '}
              <span className='text-red-600'>{element.temperatureMax}º</span>
            </Text>
          </Card>
        ))}
      </div>
    </div>
  );
}
