import { ENV } from '~/utils';
import { UserLogin, UserRegister } from '~/utils/types';

export class Auth {
  async register(data: UserRegister) {
    const url = `${ENV.STRAPI_API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, params);

      if (!response.ok) {
        const errorData = await response.json();

        return { error: { message: errorData.error.message || 'Error while register', status: response.status } };
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return { error: { message: 'Server is down. Please try again later.', status: 503 } };
    }

  }

  async login(data: UserLogin) {
    const url = `${ENV.STRAPI_API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, params);
  
      if (!response.ok) {
        const errorData = await response.json();

        return { error: { message: errorData.error.message || 'Error while login', status: response.status } };
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      return { error: { message: 'Server is down. Please try again later.', status: 503 } };
    }
  }
}
