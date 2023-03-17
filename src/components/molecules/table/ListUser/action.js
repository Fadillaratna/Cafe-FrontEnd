import fetch from '../../../../utils/fetch';
import { SERVICES } from '../../../../config';
import { getToken } from '../../../../utils/storage';

const fetchUpdate = async (payload, id) => {
  const options = {
    method: 'PUT',
    url: `${SERVICES.USER}/${id}`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };
  const response = await fetch(options);
  return response;
};

export { fetchUpdate };
