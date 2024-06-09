import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData, Form } from '@remix-run/react';
import authenticator from '~/services/auth.server';

import { User } from '~/services/session.server';

/**
 * check the user to see if there is an active session, if not
 * redirect to login page
 *
 */
export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });
};

/**
 *  handle the logout request
 *
 */
export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: '/login' });
};

export default function Index() {
  const data: User = useLoaderData();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h2 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>
        Welcome
      </h2>
      <p>
        {data?.name} {data?.token}
      </p>
      <Form method='post'>
        <button
          className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
          type='submit'
        >
          Log out
        </button>
      </Form>
    </div>
  );
}
