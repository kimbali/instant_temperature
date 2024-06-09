import React from 'react';

interface TextProps {
  children: React.ReactNode;
}
export function Text({ children }: TextProps) {
  return <p className='text-lg font-medium text-gray-900 '>{children}</p>;
}
