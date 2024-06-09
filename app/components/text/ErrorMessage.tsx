import React from 'react';

interface ErrorMessageProps {
  children: React.ReactNode;
  hasError: boolean;
}

export function ErrorMessage({ children, hasError }: ErrorMessageProps) {
  if (!hasError) return null;

  return (
    <div
      role='alert'
      className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-6'
    >
      <p>{children}</p>
    </div>
  );
}

export default ErrorMessage;
