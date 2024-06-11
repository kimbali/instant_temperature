import { ENV } from '~/utils';
import { UserLogin, UserRegister } from '../session.server';

export class Auth {
  async register(data: UserRegister) {
    try {
      const url = `${process.env.STRAPI_API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
  
      const response = await fetch(url, params);
  
      if (!response.ok) {
        return { error: {message: 'Server is disconected', status: error.status} };
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      return { error: {message: 'Server is disconected', status: error.status} };
    }
  }
  async login(data: UserLogin) {
    try {
      const url = `${process.env.STRAPI_API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
  
      const response = await fetch(url, params);
  
      if (!response.ok) {
        return { error: {message: 'Server is disconected', status: error.status} };
      }
  
      const result = await response.json();

      return result;
    } catch (error) {
      return { error: {message: 'Server is disconected', status: error.status} };
    }
  }
}
