import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { ROUTES } from '../config';
import { clearLocalStorage, getToken, getUserData } from '../utils/storage';

const AdminRoute = (props) => {
  const { children } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if(getToken()){
      if (getUserData().role !== 'admin') {
        clearLocalStorage();
        navigate(ROUTES.LOGIN);
      }
    }else{
      navigate(ROUTES.LOGIN);
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.element,
};
