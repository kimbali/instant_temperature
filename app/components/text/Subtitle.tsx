import React from 'react';

interface SubtitleProps {
  children: React.ReactNode;
}

export function Subtitle({ children }: SubtitleProps) {
  return (
    <h3 className='mb-10 text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl'>
      {children}
    </h3>
  );
}
