import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../../assets/logo.png';

const Component = (props) => {
  const { width, height } = props;
  return <img src={logo} width={width} height={height} alt=''/>;
};

export default Component;

Component.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
