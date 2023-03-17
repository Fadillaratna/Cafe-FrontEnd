import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//? Material UI
import { VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material';
import { FormControl, InputLabel, OutlinedInput, IconButton, FormHelperText } from '@mui/material';

const Component = (props) => {
  const { label, id, name, autoComplete, value, error, helperText, onChange } = props;
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    if (label === 'Password') {
      setShowPassword(false);
    }
  }, [label]);

  return (
    <FormControl fullWidth variant="outlined" sx={{ marginY: 1, borderRadius: 2 }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        name={name}
        autoComplete={autoComplete}
        label={label}
        error={error}
        sx={{ borderRadius: 2 }}
        endAdornment={
          label === 'Password' ? (
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
            </IconButton>
          ) : null
        }
        onChange={onChange}
      />
      {error ? <FormHelperText sx={{ color: '#E74C3C' }}>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};

export default Component;

Component.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
};
