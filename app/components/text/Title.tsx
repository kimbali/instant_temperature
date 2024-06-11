import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  return (
    <h2 className='w-full mb-10 mt-10 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-center'>
      {children}
    </h2>
  );
}
