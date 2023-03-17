import fetch from '../../../../utils/fetch';
import { SERVICES } from '../../../../config';

const fetchLogin = (payload) => {
  const options = {
    method: 'POST',
    url: `${SERVICES.USER}/login`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = fetch(options);
  return response;
};

export { fetchLogin };
