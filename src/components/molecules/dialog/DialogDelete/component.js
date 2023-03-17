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

const Component = (props) => {
  const { showDialog, closeDialog, processDelete, table, data } = props;

  return (
    <>
      <Dialog
        open={showDialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={styles.title}>
          Delete {table}
        </DialogTitle>
        <DialogContent sx={styles.confirmContent}>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete this {table} {data}? This action can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={styles.action}>
          <Button onClick={closeDialog} sx={styles.btnCancel} variant='contained'>
            Cancel
          </Button>
          <Button
            sx={styles.btnDelete}
            onClick={processDelete}
          >
            Delete
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
  processDelete: PropTypes.func,
  table: PropTypes.string,
  data: PropTypes.string,
};
