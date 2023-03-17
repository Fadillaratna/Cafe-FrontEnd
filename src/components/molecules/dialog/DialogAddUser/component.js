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
  IconButton,
  Autocomplete,
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText
} from '@mui/material';
import { VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material';

import styles from './style';

const Component = (props) => {
  const { open, handleClose, processAdd } = props;

  const [loading, setLoading] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const listRole = ['admin', 'cashier', 'manager'];
  const listGender = ['male', 'female'];

  const _handleAdd = (payload, actions) => {
    setLoading(true);
    setTimeout(() => {
      processAdd(payload, actions);
    }, 1000);
    setLoading(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name_user: '',
      role: '',
      username: '',
      password: '',
      gender: '',
      telephone: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      _handleAdd(values, actions);
    },
  });

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className={styles.form}>
              <TextField
                fullWidth
                margin="normal"
                id="name_user"
                label="Name"
                type="text"
                variant="outlined"
                value={formik.values.name_user || ''}
                error={formik.touched.name_user && Boolean(formik.errors.name_user)}
                helperText={formik.touched.name_user && formik.errors.name_user}
                onChange={formik.handleChange}
              />
            </div>
            <div className={styles.form}>
              <TextField
                fullWidth
                margin="normal"
                id="username"
                label="Username"
                type="text"
                variant="outlined"
                value={formik.values.username || ''}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                onChange={formik.handleChange}
              />
            </div>
            <div className={styles.form}>
              <TextField
                fullWidth
                margin="normal"
                id="telephone"
                label="Telephone"
                type="text"
                variant="outlined"
                value={formik.values.telephone || ''}
                error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                helperText={formik.touched.telephone && formik.errors.telephone}
                onChange={formik.handleChange}
              />
            </div>
            <div className={styles.form}>
              <FormControl fullWidth variant="outlined" margin="normal" label="Password">
                <InputLabel htmlFor="component-outlined">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={formik.values.password || ''}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  onChange={formik.handleChange}
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                    </IconButton>
                  }
                />
                {formik.touched.password && Boolean(formik.errors.password) ? <FormHelperText sx={{ color: '#E74C3C' }}>{formik.touched.password && formik.errors.password}</FormHelperText> : null}
              </FormControl>
            </div>
            <div className={styles.form}>
              <Autocomplete
                filterSelectedOptions
                id="combo-box-name"
                isOptionEqualToValue={(option, value) => option === value}
                options={[...listGender, formik.values.gender]}
                getOptionLabel={(option) => option}
                value={formik.values.gender}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    margin="normal"
                    id="gender"
                    label="Gender"
                    variant="outlined"
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                    helperText={formik.touched.gender && formik.errors.gender}
                  />
                )}
                onChange={(event, value) => {
                  if (value === 'male') {
                    formik.setFieldValue('gender', 'male');
                  } else if (value === 'female') {
                    formik.setFieldValue('gender', 'female');
                  }
                }}
              />
            </div>
            <div className={styles.form}>
              <Autocomplete
                filterSelectedOptions
                id="combo-box-name"
                isOptionEqualToValue={(option, value) => option === value}
                options={[...listRole, formik.values.role]}
                getOptionLabel={(option) => option}
                value={formik.values.role}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    margin="normal"
                    id="role"
                    label="Role"
                    variant="outlined"
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                  />
                )}
                onChange={(event, value) => {
                  if (value === 'admin') {
                    formik.setFieldValue('role', 'admin');
                  } else if (value === 'cashier') {
                    formik.setFieldValue('role', 'cashier');
                  } else if (value === 'manager') {
                    formik.setFieldValue('role', 'manager');
                  }
                }}
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
