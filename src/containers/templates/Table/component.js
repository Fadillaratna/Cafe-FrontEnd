import React from 'react';

//? Component
import MainLayout from '../../organisms/MainLayout';
import { Paper } from '@mui/material';

import TableOrganisms from '../../organisms/ListTable';

const Component = () => {
  return (
    <>
      <MainLayout title="Table">
        <>
          <Paper sx={{ p: 4, minWidth: 100, overflow: 'auto' }}>
            <TableOrganisms />
          </Paper>
        </>
      </MainLayout>
    </>
  );
};

export default Component;
