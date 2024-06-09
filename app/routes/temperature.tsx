import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Card } from '~/components/card';
import { Title } from '~/components/text';
import { Tomorrow } from '~/services/api/tomorrow';

const tomorrowCtrl = new Tomorrow();

export const loader: LoaderFunction = async () => {
  const response = await tomorrowCtrl.getCurrentTemperature({
    lat: '42.3478',
    long: '-71.0466',
  });

  if (response.error) {
    return json(
      { error: response.error.message },
      { status: response.error.status }
    );
  }

  return response;
};

export default function TemperaturePage() {
  const tomorrowData = useLoaderData();
  console.log('data: ', tomorrowData);

  return (
    <div className='w-full max-w-sm'>
      <Title>Temperature</Title>

      <Card title='Current temperature' text='23.5' />
    </div>
  );
}
