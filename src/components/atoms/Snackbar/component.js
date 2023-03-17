import React from 'react';
import PropTypes from 'prop-types';

import { Snackbar, Alert, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const Component = (props) => {
  const { open, handleClose, alert } = props;
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert
          severity={alert.severity}
          style={{ minWidth: 700 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              data-testid="icon-close"
              onClick={handleClose}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          onClose={handleClose}
        >
          <b style={{ textTransform: 'capitalize' }}>{`${alert.severity}. `}</b>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Component;
Component.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  alert: PropTypes.object,
};
