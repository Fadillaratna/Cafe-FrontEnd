import fetch from '../../../utils/fetch';
import { SERVICES } from '../../../config';
import { getToken } from '../../../utils/storage';

const fetchGetAll = () => {
  const options = {
    method: 'GET',
    url: `${SERVICES.TRANSACTION}/favMenu`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  };

  const response = fetch(options);
  return response;
};

export { fetchGetAll };
