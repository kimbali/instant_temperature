import React from 'react';
interface CardProps {
  title?: string;
  text?: string | null;
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`border border-gray-200 rounded-lg shadow hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700 snap-center m-2 mb-10 flex flex-col items-center justify-between ${className}`}
    >
      <div className='w-20 py-4 px-2 flex flex-col items-center justify-between'>
        {children}
      </div>
    </div>
  );
};
