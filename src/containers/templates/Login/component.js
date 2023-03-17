import React from 'react';

import FormLogin from '../../../components/molecules/form/Login';
import Logo from '../../../components/atoms/Logo';

//? Material UI
import { Grid, Typography, CssBaseline, Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';

const Component = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} sx={{px: 4}}square>
        <Stack direction="row" spacing={3} sx={{ marginTop: 15, px: 8}} alignItems="center">
          <Logo width={60} height={60} />
          <Stack direction="column" spacing={1}>
            <Typography variant="h5" sx={{ fontSize: 20 }} fontWeight={700}>
              Specta Cafe
            </Typography>
            <Typography variant="h6" sx={{ fontSize: 17, color: 'grey' }} fontWeight={400}>
              User Login
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ marginTop: 8, px: 8 }}>
          <Typography variant="h4" fontWeight={600}>
            Hello, welcome!
          </Typography>
          <Typography variant="h6" sx={{ my: 2, color: 'grey', fontSize: 17 }} fontWeight={400}>
            Please login to access all available features
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FormLogin />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Component;
