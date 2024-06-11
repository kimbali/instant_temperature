import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/react';
import { Title } from '~/components/text/Title';
import { commitSession, getSession } from '~/services/session.server';
import { ENV } from '~/utils';

/**
 * Redirect to home automatically
 * and remove token from the session
 */
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));
  session.unset('token');
  session.unset('user');

  return redirect(ENV.ROUTES.HOME, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function LogoutPage() {
  return (
    <div className='w-full max-w-sm mx-auto pb-16 pt-24'>
      <Title>Bye Bye</Title>
    </div>
  );
}
