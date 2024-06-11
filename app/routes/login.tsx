import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { Form, json, redirect, useActionData } from '@remix-run/react';
import { Button } from '~/components/button/Button';
import { ButtonLink } from '~/components/button/ButtonLink';
import { Input } from '~/components/input/Input';
import { ErrorMessage } from '~/components/text/ErrorMessage';
import { Title } from '~/components/text/Title';
import { Auth } from '~/services/api';
import { commitSession, getSession } from '~/services/session.server';
import { ENV } from '~/utils';

const authCtrl = new Auth();

/**
 * Redirect to temperature if the user is logged in
 *
 */
export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));
  const token = session.get('token');

  if (token) {
    return redirect(ENV.ROUTES.TEMPERATURE);
  }

  return null;
};

/**
 * on submit action
 *
 */
export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));

  const formData = await request.formData();
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  if (!password) {
    return json({ error: 'All fields are required' }, { status: 400 });
  }

  const response = await authCtrl.login({
    identifier: username || email,
    password,
  });

  if (response.error) {
    return json(
      { error: response.error.message || 'Error while login' },
      { status: response.error.status || 500 }
    );
  } else {
    session.set('token', response.jwt);
    session.set('user', response.user);

    return redirect(ENV.ROUTES.HOME, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }
};

export default function LoginPage() {
  const actionData = useActionData();

  return (
    <div className='w-full max-w-sm mx-auto pb-16 pt-24'>
      <Title>Login</Title>

      <Form method='post'>
        <Input
          name='username'
          type='username'
          label='Username'
          placeholder='username or email'
        />
        <Input
          name='password'
          type='password'
          placeholder='******'
          autoComplete='current-password'
          label='password'
        />

        <div className='flex items-center justify-between'>
          <ButtonLink to={ENV.ROUTES.REGISTER}>Register</ButtonLink>

          <Button type='submit' primary>
            Sign up
          </Button>
        </div>
      </Form>

      <ErrorMessage hasError={actionData?.error}>
        {actionData?.error}
      </ErrorMessage>
    </div>
  );
}
