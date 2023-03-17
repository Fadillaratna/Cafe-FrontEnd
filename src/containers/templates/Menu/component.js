import React from 'react';

//? Component
import MainLayout from '../../organisms/MainLayout';
import {
  Container,
} from '@mui/material';

import FoodOrganisms from '../../organisms/Menu';


const Component = () => {
  return (
    <>
      <MainLayout title="Menu">
        <>
          <Container style={{ padding: 4}}>
            <FoodOrganisms />
          </Container>
        </>
      </MainLayout>
    </>
  );
};

export default Component;
