import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  primary?: boolean;
  secondary?: boolean;
  children: React.ReactNode;
}

export function Button({
  onClick,
  type = 'button',
  primary,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        'shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded',
        {
          ['bg-cyan-500 hover:bg-cyan-400']: primary,
          ['bg-cyan-300 hover:bg-cyan-400']: !primary,
        }
      )}
    >
      {children}
    </button>
  );
}
