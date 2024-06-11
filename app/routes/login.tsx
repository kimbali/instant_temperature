import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { Form, json, redirect, useActionData } from '@remix-run/react';
import { Button } from '~/components/button/Button';
import { ButtonLink } from '~/components/button/ButtonLink';
import { Input } from '~/components/input/Input';
import { ErrorMessage } from '~/components/text/ErrorMessage';
import { Title } from '~/components/text/Title';
import { Auth } from '~/services/api';
import { Token } from '~/services/api/token';
import authenticator from '~/services/auth.server';
import { sessionStorage } from '~/services/session.server';
import { ENV } from '~/utils';

const authCtrl = new Auth();
const tokenCtrl = new Token();

/**
 * get the cookie and see if there are any errors that were
 * generated when attempting to login
 *
 */
export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: ENV.ROUTES.HOME,
  });

  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  const error = session.get('sessionErrorKey');
  return json({ error });
};

/**
 * on submit action
 *
 */
export const action: ActionFunction = async ({ request }) => {
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
    tokenCtrl.setToken(response.jwt);
    return redirect(ENV.ROUTES.TEMPERATURE);
  }
};

export default function LoginPage() {
  const actionData = useActionData();
  console.log(3, actionData);
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
