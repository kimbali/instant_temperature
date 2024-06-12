import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ButtonLink } from '~/components/button/ButtonLink';
import { Text } from '~/components/text/Text';
import { getSession } from '~/services/session.server';
import { ENV } from '~/utils';

/**
 * Redirect to temperature if the user is logged in
 *
 */
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));
  const user = session.get('user');

  return json({ user });
};

export default function Index() {
  const data = useLoaderData();

  return (
    <div className='pb-16 max-w-screen-lg mx-auto flex items-center flex-col'>
      <h2 className='mb-8 mt-8 text-4xl text-cyan-600 font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl'>
        Instant temperature
      </h2>

      <Text className='w-full text-center mb-10 text-cyan-500 text-xl'>
        Select a point on the map to get the current temperature, the trend of
        the last week and the location forecast for the following days
      </Text>

      {data?.user ? (
        <ButtonLink to={ENV.ROUTES.TEMPERATURE}>Select a location</ButtonLink>
      ) : (
        <ButtonLink to={ENV.ROUTES.REGISTER}>Register a user</ButtonLink>
      )}
    </div>
  );
}
