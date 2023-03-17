import axios from 'axios';
import routes from '../config/routes';
import { clearLocalStorage } from './storage';

export default function fetch(options) {
  const { pathname } = window.location;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(options);
      resolve(response.data);
    } catch (error) {
      const defaultError = {
        success: false,
        data: null,
        code: 500,
        message: 'Failed to fetch data. Please contact developer.',
      };

      if (error.response) {
        if ((error.response.status === 401) && pathname !== routes.LOGIN) {
          clearLocalStorage();
          window.location.href = routes.LOGIN;
        } else {
          reject(error.response.data);
        }
      } else {
        reject(defaultError);
      }
    }
  });
}
