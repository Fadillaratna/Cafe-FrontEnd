import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import styles from './style';

import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { validationSchema } from './validate';

const Component = (props) => {
  const { showDialog, closeDialog, processSave, message, title, total } = props;
  const [totalReturn, setTotalReturn] = useState('');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      total_bayar: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      processSave(values.total_bayar, actions);
    },
  });

  const _handleEnter = (e) => {
    if (e.key === 'Enter') {
      if(formik.values.total_bayar < total){
        window.alert("Total payment you entered does not match. Please input again!")
      }else{
        setTotalReturn(formik.values.total_bayar - total);
      }
    }
  };

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
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>

          <div className={styles.form}>
            <TextField
              autoFocus
              margin="normal"
              id="total_bayar"
              label="Total Pay"
              type="test"
              fullWidth
              variant="standard"
              value={formik.values.total_bayar || ''}
              error={formik.touched.total_bayar && Boolean(formik.errors.total_bayar)}
              helperText={formik.touched.total_bayar && formik.errors.total_bayar}
              onChange={formik.handleChange}
              onKeyDown={(e) => _handleEnter(e)}
            />
          </div>
          <div className={styles.form}>
            <TextField
              disabled
              autoFocus
              margin="normal"
              id="total_kembali"
              label="Total Return"
              type="text"
              fullWidth
              variant="standard"
              value={totalReturn}
            />
          </div>
        </DialogContent>
        <DialogActions sx={styles.action}>
          <Button onClick={closeDialog} sx={styles.btnCancel} variant="contained">
            Cancel
          </Button>
          <Button sx={styles.btnSubmit} onClick={formik.handleSubmit}>
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
  total: PropTypes.number,
};
