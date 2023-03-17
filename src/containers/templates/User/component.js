import React from 'react';

//? Component
import MainLayout from '../../organisms/MainLayout';
import {
  Paper,
} from '@mui/material';

import UserOrganisms from '../../organisms/ListUser';

const Component = () => {
  return (
    <>
      <MainLayout title="User">
        <>
          <Paper sx={{ p: 4, minWidth: 100, overflow: 'auto' }}>
            <UserOrganisms />
          </Paper>
        </>
      </MainLayout>
    </>
  );
};

export default Component;
