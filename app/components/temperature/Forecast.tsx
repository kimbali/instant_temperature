import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card } from '~/components/card';
import { Text } from '~/components/text';
import { Forecast, TemperatureDate } from '~/routes/temperature';

export const loader: LoaderFunction = async ({ routeLoaderData }) => {
  return routeLoaderData;
};

export default function ForecastComponent() {
  const data: TemperatureDate = useLoaderData();

  if (!data) return null;
  return (
    <div className='mt-10 mb-10 w-full overflow-y-scroll no-scrollbar flex'>
      {data.forecast.map((element: Forecast, index: number) => (
        <Card
          key={`forecast${index}`}
          className='mr-10 mb-10 w-60 min-w-48 flex flex-col items-center justify-between'
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
  );
}
