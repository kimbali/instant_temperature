import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  primary?: boolean;
  secondary?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

export function Button({
  onClick,
  type = 'button',
  primary,
  children,
  disabled,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={classNames(
        'shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-2',
        {
          ['bg-cyan-600 hover:bg-cyan-400']: primary && !disabled,
          ['bg-cyan-500 hover:bg-cyan-400']: !primary && !disabled,
          ['bg-cyan-900 hover:bg-cyan-900']: disabled,
        }
      )}
    >
      {children}
    </button>
  );
}
