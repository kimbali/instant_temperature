import { ENV } from '~/utils';
import { UserLogin, UserRegister } from '~/utils/types';

/**
 * Class to handle user authentication, including registration and login, with Strapi.
 */
export class Auth {
  /**
   * Registers a new user with the provided data.
   * @param {UserRegister} data - The registration data, including username, email, and password.
   * @returns - The result of the registration or an error object.
   */
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
        return {
          error: {
            message: errorData.error.message || 'Error while registering',
            status: response.status,
          },
        };
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        error: {
          message: 'Server is down. Please try again later.',
          status: 503,
        },
      };
    }
  }

  /**
   * Logs in a user with the provided data.
   * @param {UserLogin} data - The login data, including identifier and password.
   * @returns - The result of the login or an error object.
   */
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
        return {
          error: {
            message: errorData.error.message || 'Error while logging in',
            status: response.status,
          },
        };
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return {
        error: {
          message: 'Server is down. Please try again later.',
          status: 503,
        },
      };
    }
  }
}
