import fetch from '../../../utils/fetch';
import { SERVICES } from '../../../config';
import { getToken } from '../../../utils/storage';

const fetchGetAllTransaction = (date, user, keyword, month) => {
  const options = {
    method: 'GET',
    url: `${SERVICES.TRANSACTION}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    params: {
      date: date,
      user: user,
      keyword: keyword,
      month: month,
    }
  };

  const response = fetch(options);
  return response;
};

const fetchPayOrder = (id, payload) => {
  const options = {
    method: 'PUT',
    url: `${SERVICES.TRANSACTION}/updateStatus/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    data: payload
  };

  const response = fetch(options);
  // console.log(response)
  return response;
};

const fetchGetAllUser = (role, keyword) => {
  const options = {
    method: 'GET',
    url: `${SERVICES.USER}/`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    params: {
      role: role,
      keyword: keyword
    }
  };

  const response = fetch(options);
  return response;
};



export { fetchGetAllTransaction, fetchGetAllUser, fetchPayOrder };
