import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { TemperatureDate } from '~/utils/types';
import { Text } from '../text/Text';

export const loader: LoaderFunction = async ({ routeLoaderData }) => {
  return routeLoaderData;
};

export default function CurrentTemperature() {
  const data: TemperatureDate = useLoaderData();

  if (!data) return null;
  return (
    <div className='z-1 w-28 py-2 flex flex-col items-center px-2 absolute top-0 right-0 border border-gray-200 rounded-lg shadow hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700'>
      <Text size='text-1xl mb-1 text-cyan-400 text-center'>
        {data.geoLocation || 'Unknown'}
      </Text>
      <Text size='text-2xl bold'>{data.currentTemperature}ºC</Text>
    </div>
  );
}
