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

export { fetchGetAll };
