import React from 'react';

interface SubtitleProps {
  children: React.ReactNode;
}

export function Subtitle({ children }: SubtitleProps) {
  return (
    <h3 className='mb-4 mt-4 text-2xl font-bold tracking-tight text-gray-900 text-white'>
      {children}
    </h3>
  );
}
