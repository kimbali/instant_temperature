import React from 'react';

interface TextProps {
  children: React.ReactNode;
  size?: string;
  color?: string;
  className?: string;
}
export function Text({
  children,
  size,
  color = '',
  className = '',
}: TextProps) {
  return (
    <p className={`font-normal ${size || 'text-base'} ${color} ${className}`}>
      {children}
    </p>
  );
}
