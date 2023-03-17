import fetch from '../../../../utils/fetch';
import { SERVICES } from '../../../../config';
import { getToken } from '../../../../utils/storage';

const fetchUpdate = async (payload, id) => {
  const options = {
    method: 'PUT',
    url: `${SERVICES.MENU}/${id}`,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      Authorization: `Bearer ${getToken()}`,
    },
  };
  const response = await fetch(options);
  return response;
};

export { fetchUpdate };
