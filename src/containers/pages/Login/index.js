import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../config';
import { getToken, getUserData } from '../../../utils/storage';
import LoginTemplate from '../../templates/Login';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      if(getUserData().role === 'admin'){
        navigate(ROUTES.DASHBOARD_ADMIN);
      }else if(getUserData().role === 'cashier'){
        navigate(ROUTES.DASHBOARD_CASHIER)
      }else if(getUserData().role === 'manager'){
        navigate(ROUTES.DASHBOARD_MANAGER)
      }
    }
  }, [navigate]);
  return <LoginTemplate />;
};

export default Login;
