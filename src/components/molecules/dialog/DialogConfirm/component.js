import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import styles from './style';

import PropTypes from 'prop-types';
import { TitleRounded } from '@mui/icons-material';

const Component = (props) => {
  const { showDialog, closeDialog, processSave, message, title } = props;

  return (
    <>
      <Dialog
        open={showDialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={styles.title}>
          {title}
        </DialogTitle>
        <DialogContent sx={styles.confirmContent}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={styles.action}>
          <Button onClick={closeDialog} sx={styles.btnCancel} variant="contained">
            Cancel
          </Button>
          <Button sx={styles.btnSubmit} onClick={processSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Component;
Component.propTypes = {
  showDialog: PropTypes.bool,
  closeDialog: PropTypes.func,
  processSave: PropTypes.func,
  message: PropTypes.string,
  title: PropTypes.string,
};
