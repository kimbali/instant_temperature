import React from 'react';
import { Subtitle, Text } from '../text';

interface CardProps {
  title?: string;
  text?: string | null;
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ title, text, children, className = '' }: CardProps) => {
  return (
    <div
      className={`p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 bg-gray-800 border-gray-700 hover:bg-gray-700 ${className}`}
    >
      {title && <Subtitle>{title}</Subtitle>}
      <Text>{text}</Text>
      {children}
    </div>
  );
};
