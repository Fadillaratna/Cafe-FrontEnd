import fetch from '../../../utils/fetch';
import { SERVICES } from '../../../config';
import { getToken } from '../../../utils/storage';

const fetchGetAll = (type, keyword, subtype) => {
  const options = {
    method: 'GET',
    url: `${SERVICES.MENU}/`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    params: {
      type: type,
      keyword: keyword,
      subtype: subtype
    }
  };

  const response = fetch(options);
  return response;
};

const fetchDelete = (id) => {
  const options = {
    method: 'DELETE',
    url: `${SERVICES.MENU}/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  };

  const response = fetch(options);
  return response;
}

const fetchAdd = async (payload) => {
  const options = {
    method: 'POST',
    url: `${SERVICES.MENU}/`,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      Authorization: `Bearer ${getToken()}`,
    },
  };
  console.log(options)
  const response = await fetch(options);
  return response;
};

export { fetchGetAll, fetchDelete, fetchAdd };
