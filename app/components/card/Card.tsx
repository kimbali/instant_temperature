import { CardProps } from '~/utils/types';

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`border border-gray-200 rounded-lg shadow hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700 snap-center m-2 mb-10 flex flex-col items-center justify-between ${className}`}
    >
      <div className='w-24 py-4 px-2 flex flex-col items-center justify-between'>
        {children}
      </div>
    </div>
  );
};
