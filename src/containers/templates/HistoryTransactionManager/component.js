import React from 'react';

//? Component
import MainLayout from '../../organisms/MainLayout';
import {
  Paper,
} from '@mui/material';

import TransactionOrganisms from '../../organisms/HistoryTransaction';

const Component = () => {
  return (
    <>
      <MainLayout title="Transaction Report">
        <>
          <Paper sx={{ p: 4, minWidth: 100, overflow: 'auto' }}>
            <TransactionOrganisms />
          </Paper>
        </>
      </MainLayout>
    </>
  );
};

export default Component;
