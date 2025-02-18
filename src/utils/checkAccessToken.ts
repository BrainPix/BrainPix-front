import { DecodedJWTType } from '../types/applyTypes';

export const validateJWT = (accessToken: string) => {
  if (
    !accessToken ||
    typeof accessToken !== 'string' ||
    !accessToken.includes('.')
  ) {
    return true;
  }

  try {
    const token = accessToken.replace('Bearer ', '');

    const base64Payload = token.split('.')[1];
    const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');

    const decodedJWT = JSON.parse(
      decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      ),
    );

    return isTokenExpired(decodedJWT);
  } catch {
    return true;
  }
};

const isTokenExpired = (decodedToken: DecodedJWTType): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
};

export const checkAccessToken = () => {
  const token = localStorage.getItem('accessToken');

  if (!token || validateJWT(token)) {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
    return null;
  }

  return token;
};
