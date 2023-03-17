import React from 'react';

//? Component
import MainLayout from '../../organisms/MainLayout';
import PieBar from '../../../components/atoms/PieBar';
import { Grid, Box, Typography, Button } from '@mui/material';

import illustration from '../../../assets/homeIllus.png';

import { getUserData } from '../../../utils/storage';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config';

const Component = () => {
  const navigate = useNavigate();

  const _handleClickStart = () => {
    if (getUserData()) {
      if (getUserData().role === 'admin') {
        navigate(ROUTES.TABLE_ADMIN);
      } else if (getUserData().role === 'cashier') {
        navigate(ROUTES.TABLE_CASHIER);
      } else if (getUserData().role === 'manager') {
        navigate(ROUTES.TRANSACTION_REPORT_MANAGER);
      }
    }
  };
  return (
    <>
      <MainLayout title="Dashboard">
        <>
          <Grid container component="main" sx={{ height: '90', my: 2 }} spacing={4}>
            <Grid item xs={8}>
              <Box>
                <Typography variant="h3" fontWeight={600} sx={{ lineHeight: 1.5 }}>
                  Hello, Welcome to <br />
                  Specta Cafe!
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ my: 2, color: 'grey', fontSize: 20, lineHeight: 2 }}
                  fontWeight={400}
                >
                  Welcome {getUserData() ? getUserData().name_user : null} as{' '}
                  {getUserData() ? getUserData().role : null} at Specta Cafe. <br /> Happy working
                  and managing the dashboard well!
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#3178F6', boxShadow: 'none' }}
                  size="large"
                  onClick={_handleClickStart}
                >
                  Start Now
                </Button>
              </Box>
            </Grid>
            <Grid item xs={4}>
              {getUserData() ? (
                getUserData().role === 'manager' ? (
                  <PieBar />
                ) : (
                  <img
                    src={illustration}
                    alt=""
                    width={330}
                    height={461}
                    style={{ marginLeft: 10 }}
                  />
                )
              ) : null}
            </Grid>
          </Grid>
        </>
      </MainLayout>
    </>
  );
};

export default Component;
