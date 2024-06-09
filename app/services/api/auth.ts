import { ENV } from '~/utils';
import { UserLogin, UserRegister } from '../session.server';

export class Auth {
  async register(data: UserRegister) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  }

  async login(data: UserLogin) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  }
}
