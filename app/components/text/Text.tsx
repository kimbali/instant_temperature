import { TextProps } from '~/utils/types';

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
