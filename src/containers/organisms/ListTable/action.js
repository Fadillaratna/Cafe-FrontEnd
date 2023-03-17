import fetch from '../../../utils/fetch';
import { SERVICES } from '../../../config';
import { getToken } from '../../../utils/storage';

const fetchGetAll = (status, keyword) => {
  const options = {
    method: 'GET',
    url: `${SERVICES.TABLE}/`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    params: {
      status: status,
      keyword: keyword
    }
  };

  const response = fetch(options);
  return response;
};

const fetchDelete = (id) => {
  const options = {
    method: 'DELETE',
    url: `${SERVICES.TABLE}/${id}`,
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
    url: `${SERVICES.TABLE}/`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };
  const response = await fetch(options);
  return response;
};

const fetchUpdate = async (payload, id) => {
  const options = {
    method: 'PUT',
    url: `${SERVICES.TABLE}/${id}`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  };
  const response = await fetch(options);
  return response;
};

export { fetchGetAll, fetchDelete, fetchAdd, fetchUpdate };
