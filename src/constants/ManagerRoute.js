import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { ROUTES } from '../config';
import { getToken, getUserData, clearLocalStorage } from '../utils/storage';

const ManagerRoute = (props) => {
  const { children } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if(getToken()){
      if (getUserData().role !== 'manager') {
        clearLocalStorage();
        navigate(ROUTES.LOGIN);
      }
    }else{
      navigate(ROUTES.LOGIN);
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ManagerRoute;

ManagerRoute.propTypes = {
  children: PropTypes.element,
};
