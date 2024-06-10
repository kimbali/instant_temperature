import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card } from '~/components/card';
import { Text } from '~/components/text';
import { TemperatureDate } from '~/routes/temperature';

export const loader: LoaderFunction = async ({ routeLoaderData }) => {
  return routeLoaderData;
};

export default function CurrentTemperature() {
  const data: TemperatureDate = useLoaderData();

  if (!data) return null;
  return (
    <div className='w-full flex justify-center mb-16'>
      <Card
        title='Current temperature'
        className='w-fit flex flex-col items-center justify-between'
      >
        <Text size='text-7xl'>{data.currentTemperature}ºC</Text>
      </Card>
    </div>
  );
}
