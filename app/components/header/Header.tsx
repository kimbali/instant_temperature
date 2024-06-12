import { Link } from '@remix-run/react';
import { ENV } from '~/utils';

export default function Header({ user }) {
  return (
    <header className='bg-gray-600 p-2'>
      <div className='container mx-auto flex justify-between items-center'>
        <p className='text-white text-2xl'>
          {user ? user.username : 'Instant temperature'}
        </p>

        <nav>
          {user ? (
            <>
              <Link
                to={ENV.ROUTES.HOME}
                className='text-gray-400 hover:text-white mx-2'
              >
                Home
              </Link>

              <Link
                to={ENV.ROUTES.LOGOUT}
                className='text-gray-400 hover:text-white mx-2'
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to={ENV.ROUTES.REGISTER}
                className='text-gray-400 hover:text-white mx-2'
              >
                Register
              </Link>
              <Link
                to={ENV.ROUTES.LOGIN}
                className='text-gray-400 hover:text-white mx-2'
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
