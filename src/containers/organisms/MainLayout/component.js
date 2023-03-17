import React from 'react';
import PropTypes from 'prop-types';

import styles from './style';
import Header from '../Header';
import Sidebar from '../Sidebar';

//Material UI
import { Box, Toolbar, Container } from '@mui/material';
import { useSelector } from 'react-redux';

const Component = (props) => {
  const { children, title, cashier } = props;
  const { openDrawer } = useSelector((file) => file.global);

  return (
    <Box sx={styles.root}>
      <Header openDrawer={openDrawer} title={title} position="fixed" />
      <Sidebar title={title} />

      {cashier ? (
        <>
          {children}
        </>
      ) : (
        <Box component="main" sx={styles.boxMain}>
          <Toolbar sx={{ height: 80 }} />
          <Box sx={{ p: 4 }}>
            <Container maxWidth="lg">{children}</Container>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Component;

Component.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  cashier: PropTypes.bool,
};
