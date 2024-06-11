import { OneDay } from '~/utils/types';
import { Card } from '../card/Card';
import { Text } from '../text/Text';

export default function ForecastComponent({ data }: { data: OneDay[] }) {
  if (!data) return null;

  return (
    <div className='w-full lg:w-96 mt-4 lg:mt-0 scroll-cards scroll-px-1.5 snap-x mt-10 mb-10 overflow-y-scroll no-scrollbar flex'>
      {data.map((element: OneDay, index: number) => (
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
