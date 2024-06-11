import {
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import stylesheet from '~/tailwind.css?url';
import Header from './components/header/Header';
import { getSession } from './services/session.server';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  {
    rel: 'stylesheet',
    href: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));
  const user = session.get('user');

  return json({ user });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData();

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Links />
      </head>
      <body className='bg-gray-900 antialiased text-gray-400'>
        <Header user={data?.user} />
        <div className='w-full px-4 mx-auto max-w-8xl'>{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
