import fetch from '../../../utils/fetch';
import { SERVICES } from '../../../config';
import { getToken } from '../../../utils/storage';

const fetchAdd = (payload) => {
  const options = {
    method: 'POST',
    url: `${SERVICES.TRANSACTION}/`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    data: payload,
  };

  const response = fetch(options);
  console.log(options);
  return response;
};

const fetchUpdate = (payload, id) => {
  const options = {
    method: 'PUT',
    url: `${SERVICES.TRANSACTION}/updateOrder/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    data: payload,
  };

  const response = fetch(options);
  console.log(options);
  return response;
};

export { fetchAdd, fetchUpdate };
