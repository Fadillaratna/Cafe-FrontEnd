import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { useFormik } from 'formik';

import { validationSchema } from './validate';

import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
  CircularProgress,
} from '@mui/material';

import styles from './style';

const Component = (props) => {
  const { open, handleClose, processAdd } = props;

  const [loading, setLoading] = useState();

  const _handleAdd = (payload, actions) => {
    setLoading(true);
    setTimeout(() => {
      processAdd(payload, actions);
    }, 1000)
    setLoading(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      table_number: '',
      capacity: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      _handleAdd(values, actions);
    },
  });

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>Add Table</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className={styles.form}>
              <TextField
                fullWidth
                margin="normal"
                id="table_number"
                label="Table Number"
                type="text"
                variant="outlined"
                value={formik.values.table_number || ''}
                error={formik.touched.table_number && Boolean(formik.errors.table_number)}
                helperText={formik.touched.table_number && formik.errors.table_number}
                onChange={formik.handleChange}
              />
            </div>
            <div className={styles.form}>
              <TextField
                fullWidth
                margin="normal"
                id="capacity"
                label="Capacity"
                type="number"
                variant="outlined"
                value={formik.values.capacity || ''}
                error={formik.touched.capacity && Boolean(formik.errors.capacity)}
                helperText={formik.touched.capacity && formik.errors.capacity}
                onChange={formik.handleChange}
              />
            </div>
          </DialogContent>
          <DialogActions sx={styles.action}>
            <Button variant="contained" sx={styles.btnCancel} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                ...styles.btnSubmit,
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Component;
Component.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  processAdd: PropTypes.func,
};
