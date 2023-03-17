import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, CircularProgress } from '@mui/material';
import FormInputOutlined from '../../../atoms/FormInputOutlined';
import Snackbar from '../../../atoms/Snackbar';

import { useFormik } from 'formik';
import { validationSchema } from './validate';

import { fetchLogin } from './action';
import { setUserData, setToken } from '../../../../utils/storage';
import { ROUTES } from '../../../../config';

const Component = () => {
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({
    message: '',
    severity: 'error',
    show: false,
  });

  const navigate = useNavigate();

  const _handleLogin = async (payload) => {
    setLoading(true);
    try {
      const response = await fetchLogin(payload);
      if (response) {
        setUserData(response.data.user);
        setToken(response.data.token);
        if (response.data.user.role === 'admin') {
          navigate(ROUTES.DASHBOARD_ADMIN);
        } else if (response.data.user.role === 'cashier') {
          navigate(ROUTES.DASHBOARD_CASHIER);
        } else if (response.data.user.role === 'manager') {
          navigate(ROUTES.DASHBOARD_MANAGER);
        }

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setAlert({
        show: true,
        message: 'Invalid username or password',
        severity: 'error',
      });
    }
  };

  const _handleCloseSnackbar = () => {
    setAlert({
      show: false,
      severity: alert.severity,
      message: alert.message,
    });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      _handleLogin(values);
    },
  });

  return (
    <>
      <Box sx={{ mt: 1 }}>
        <form onSubmit={formik.handleSubmit}>
          <FormInputOutlined
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            type="text"
            autoComplete="username"
            autoFocus
            value={formik.values.username || ''}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <FormInputOutlined
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password || ''}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#3178F6', boxShadow: 'none' }}
            size="large"
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
          </Button>
        </form>
      </Box>

      <Snackbar alert={alert} open={alert.show} handleClose={_handleCloseSnackbar} />
    </>
  );
};

export default Component;
