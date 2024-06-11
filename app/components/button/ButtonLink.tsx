import { Link } from '@remix-run/react';
import classNames from 'classnames';
import { ButtonLinkProps } from '~/utils/types';

export function ButtonLink({ children, primary, to }: ButtonLinkProps) {
  return (
    <div
      className={classNames(
        'shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded',
        {
          ['text-cyan-500 hover:bg-cyan-400']: primary,
          ['text-cyan-500 hover:bg-cyan-900 underline']: !primary,
        }
      )}
    >
      <Link to={to}>{children}</Link>
    </div>
  );
}
