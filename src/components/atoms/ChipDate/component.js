import React from 'react';

import { Chip } from '@mui/material';
import { formatDate } from '../../../utils/dateFormat';

const Component = () => {
  const date = formatDate(new Date())
  return (
    <>
      <Chip variant='filled' color='secondary' label={date} sx={{backgroundColor: '#3178F6', p: 1, borderRadius: 2}}/>
    </>
  );
};
export default Component;

