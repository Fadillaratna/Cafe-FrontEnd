import React from 'react';

//? Component
import MainLayout from '../../organisms/MainLayout';
import {
  Box, 
  Toolbar
} from '@mui/material';

import FoodOrganisms from '../../organisms/Food';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import CartOrganisms from '../../organisms/Cart';


const Component = () => {
  return (
    <>
      <MainLayout title="Food" cashier={true}>
        <>
          <ReflexContainer style={{ height: '100vh' }} orientation="vertical">
            <ReflexElement className="left-pane" minSize={890}>
              <Box sx={{ p: 10 }}>
                <Toolbar />
                <FoodOrganisms />
              </Box>
            </ReflexElement>

            {/* <ReflexSplitter propagate={true} /> */}

            <ReflexElement className="right-pane">
              <Toolbar />
              <Box sx={{ width: '100%', minHeight: '91vh', backgroundColor: '#3e3f48', px: 3, py: 8 }}>

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
