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
  Autocomplete,
} from '@mui/material';

import styles from './style';

const Component = (props) => {
  const { open, handleClose, processUpdate, menu } = props;

  const [loading, setLoading] = useState(false);

  const listType = ['food', 'drink'];
  const listSubtype = ['appetizer', 'main course', 'dessert', 'mocktail', 'coffee', 'milk based'];

  const _handleUpdate = (payload, actions) => {
    setLoading(true);
    setTimeout(() => {
      processUpdate(payload, actions);
    }, 1000);
    setLoading(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      menu_name: menu.menu_name,
      type: menu.type,
      subtype: menu.subtype,
      description: menu.description,
      image: menu.image,
      price: menu.price,
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      _handleUpdate(values, actions);
    },
  });

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>Add Menu</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className={styles.form}>
              <TextField
                fullWidth
                margin="normal"
                id="menu_name"
                label="Name"
                type="text"
                variant="outlined"
                value={formik.values.menu_name || ''}
                error={formik.touched.menu_name && Boolean(formik.errors.menu_name)}
                helperText={formik.touched.menu_name && formik.errors.menu_name}
                onChange={formik.handleChange}
              />
            </div>
            <div className={styles.form}>
              <Autocomplete
                filterSelectedOptions
                id="combo-box-name"
                isOptionEqualToValue={(option, value) => option === value}
                options={[...listType, formik.values.type]}
                getOptionLabel={(option) => option}
                value={formik.values.type}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    margin="normal"
                    id="type"
                    label="Type"
                    variant="outlined"
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    helperText={formik.touched.type && formik.errors.type}
                  />
                )}
                onChange={(event, value) => {
                  if (value === 'food') {
                    formik.setFieldValue('type', 'food');
                  } else if (value === 'drink') {
                    formik.setFieldValue('type', 'drink');
                  }
                }}
              />
            </div>
            <div className={styles.form}>
              <Autocomplete
                filterSelectedOptions
                id="combo-box-name"
                isOptionEqualToValue={(option, value) => option === value}
                options={[...listSubtype, formik.values.subtype]}
                getOptionLabel={(option) => option}
                value={formik.values.subtype}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    margin="normal"
                    id="subtype"
                    label="Subtype"
                    variant="outlined"
                    error={formik.touched.subtype && Boolean(formik.errors.subtype)}
                    helperText={formik.touched.subtype && formik.errors.subtype}
                  />
                )}
                onChange={(event, value) => {
                  if (value === 'appetizer') {
                    formik.setFieldValue('subtype', 'appetizer');

                  } else if (value === 'main course') {
                    formik.setFieldValue('subtype', 'main course');
                  } else if (value === 'dessert') {
                    formik.setFieldValue('subtype', 'dessert');
                  } else if (value === 'mocktail') {
                    formik.setFieldValue('subtype', 'mocktail');
                  } else if (value === 'coffee') {
                    formik.setFieldValue('subtype', 'coffee');
                  } else if (value === 'milk based') {
                    formik.setFieldValue('subtype', 'milk based');
                  }
                }}
              />
            </div>
            <div className={styles.form}>
              <TextField
                fullWidth
                margin="normal"
                id="price"
                label="Price"
                type="text"
                variant="outlined"
                value={formik.values.price || ''}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                onChange={formik.handleChange}
              />
            </div>
            <div sx={styles.form}>
              <TextField
                // hidden
                fullWidth
                margin="normal"
                id="image"
                label="Image"
                type="file"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
                onChange={(event) => {
                  formik.setFieldValue('image', event.target.files[0]);
                }}
              />
            </div>
            <div className={styles.form}>
              <TextField
                fullWidth
                rows={3}
                multiline={true}
                margin="normal"
                id="description"
                label="Description"
                type="text"
                variant="outlined"
                value={formik.values.description || ''}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
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
  processUpdate: PropTypes.func,
  menu: PropTypes.object,
};
