import React from 'react';
import PropTypes from 'prop-types';

import styles from './style';

//? Material UI
import { IconButton } from '@mui/material';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';

const Component = (props) => {
  const { openDrawer, handleClick } = props;
  return (
    <>
      <IconButton sx={styles.iconButton} onClick={handleClick}>
        {openDrawer ? <ChevronLeftRounded /> : <ChevronRightRounded />}
      </IconButton>
    </>
  );
};

export default Component;

Component.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
};
