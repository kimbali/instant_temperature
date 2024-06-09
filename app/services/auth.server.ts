import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { User, sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
const authenticator = new Authenticator<User | null>(sessionStorage, {
  sessionKey: "sessionKey", // keep in sync
  sessionErrorKey: "sessionErrorKey", // keep in sync
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    let user = null;

    if (!email || email?.length === 0) throw new AuthorizationError('Bad Credentials: Email is required')
    if (typeof email !== 'string')
      throw new AuthorizationError('Bad Credentials: Email must be a string')

    if (!password || password?.length === 0) throw new AuthorizationError('Bad Credentials: Password is required')
    if (typeof password !== 'string')
      throw new AuthorizationError('Bad Credentials: Password must be a string')

    if (email === 'aaron@mail.com' && password === 'password') {
      user = {
        name: email,
        token: `${password}-${new Date().getTime()}`,
      };

      return await Promise.resolve({ ...user });

    } else {
      throw new AuthorizationError("Bad Credentials")
    }

  }),
);

export default authenticator