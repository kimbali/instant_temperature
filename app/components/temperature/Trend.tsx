import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card } from '~/components/card';
import { Text, Title } from '~/components/text';
import { Forecast, TemperatureDate } from '~/routes/temperature';

export const loader: LoaderFunction = async ({ routeLoaderData }) => {
  return routeLoaderData;
};

export default function TrendComponent() {
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
