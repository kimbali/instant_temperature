import { Form, useActionData } from '@remix-run/react';
import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from '@remix-run/node';
import { ENV } from '~/utils';
import { ButtonLink } from '~/components/button/ButtonLink';
import { Auth } from '~/services/api';
import { Title } from '~/components/text/Title';
import { Input } from '~/components/input/Input';
import { Button } from '~/components/button/Button';
import { ErrorMessage } from '~/components/text/ErrorMessage';
import { commitSession, getSession } from '~/services/session.server';

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
 * Register user on strapi
 *
 */
export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));
  const formData = await request.formData();

  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password || !username) {
    return json({ error: 'All fields are required' }, { status: 400 });
  }

  const response = await authCtrl.register({ email, password, username });

  if (response.error) {
    return json(
      { error: response.error.message || 'Error while register' },
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

export default function RegisterPage() {
  const actionData = useActionData();

  return (
    <div className='w-full max-w-sm mx-auto pb-16 pt-24'>
      <Title>Register</Title>

      <Form method='post'>
        <Input
          name='username'
          type='username'
          label='Username'
          placeholder='your-name'
        />
        <Input
          name='email'
          type='email'
          label='Email'
          placeholder='youremail@mail.com'
        />
        <Input
          name='password'
          type='password'
          label='Password'
          placeholder='******'
          autoComplete='current-password'
        />

        <div className='flex items-center justify-between'>
          <ButtonLink to={ENV.ROUTES.LOGIN}>Login</ButtonLink>

          <Button type='submit' primary>
            Register
          </Button>
        </div>
      </Form>

      <ErrorMessage hasError={actionData?.error}>
        {actionData?.error}
      </ErrorMessage>
    </div>
  );
}
