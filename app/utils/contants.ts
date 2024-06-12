export const ENV = {
  STRAPI_API_URL: 'https://strapiauth-production.up.railway.app/api',
  STRAPI_URL: 'https://strapiauth-production.up.railway.app',
  ENDPOINTS: {
    AUTH: {
      REGISTER: 'auth/local/register',
      LOGIN: 'auth/local',
    },
  },
  ROUTES: {
    HOME: '/',
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    TEMPERATURE: '/temperature',
  },
  TOKEN: 'some_token',
};
