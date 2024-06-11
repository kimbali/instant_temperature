import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card } from '~/components/card';
import { Text } from '~/components/text';
import { OneDay, TemperatureDate } from '~/routes/temperature';

export const loader: LoaderFunction = async ({ routeLoaderData }) => {
  return routeLoaderData;
};

export default function ForecastComponent() {
  const data: TemperatureDate = useLoaderData();

  if (!data) return null;
  return (
    <div className='w-full lg:w-96 mt-4 lg:mt-0 scroll-cards scroll-px-1.5 snap-x mt-10 mb-10 overflow-y-scroll no-scrollbar flex'>
      {data.forecast.map((element: OneDay, index: number) => (
        <Card key={`forecast${index}`}>
          <Text color='text-gray-50 text-sm'>{element.day}</Text>
          <Text className='mb-2 text-sm'>{element.date}</Text>
          <Text size='text-sm'>
            <span className='text-cyan-600'>{element.temperatureMin}º</span> -{' '}
            <span className='text-red-600'>{element.temperatureMax}º</span>
          </Text>
        </Card>
      ))}
    </div>
  );
}
