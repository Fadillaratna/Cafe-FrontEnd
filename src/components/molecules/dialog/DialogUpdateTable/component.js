import PropTypes from 'prop-types';
import React from 'react';

import { useFormik } from 'formik';

import { validationSchema } from './validate';

import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  DialogContent,
} from '@mui/material';

import styles from './style';

const Component = (props) => {
  const { open, handleClose, processUpdate, table } = props;

  const _handleUpdate = (payload) => {
    processUpdate(payload);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      table_number: table.table_number,
      capacity: table.capacity,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      _handleUpdate(values);
    },
  });

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>Edit Table</DialogTitle>
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
              sx={{
                ...styles.btnSubmit,
              }}
            >
              Submit
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
  processUpdate: PropTypes.func,
  table: PropTypes.object,
};
