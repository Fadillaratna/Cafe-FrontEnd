import React from 'react';

//? Component
import MainLayout from '../../organisms/MainLayout';
import { Box, Toolbar } from '@mui/material';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';

import TableOrganisms from '../../organisms/TableCashier';
import CartOrganisms from '../../organisms/Cart';
import 'react-reflex/styles.css';

const Component = () => {
  return (
    <>
      <MainLayout title="Table" cashier={true}>
        <>
          <ReflexContainer style={{ height: '100vh' }} orientation="vertical">
            <ReflexElement className="left-pane" minSize={890}>
              <Box sx={{ p: 10 }}>
                <Toolbar />
                <TableOrganisms />
              </Box>
            </ReflexElement>

            {/* <ReflexSplitter propagate={true} /> */}

            <ReflexElement className="right-pane">
              <Toolbar />
              <Box
                sx={{ width: '100%', minHeight: '91vh', backgroundColor: '#3e3f48', px: 3, py: 8 }}
              >
                <CartOrganisms />
              </Box>
            </ReflexElement>
          </ReflexContainer>
        </>
      </MainLayout>
    </>
  );
};

export default Component;
