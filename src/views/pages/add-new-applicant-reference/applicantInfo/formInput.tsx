import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Autocomplete,
  TextField,
  useMediaQuery
} from '@mui/material';

const FormInput = ({ errors, handleBlur, handleChange, touched, values, label, required, type, name }: any) => (
  <FormControl fullWidth error={Boolean(touched && errors)}>
    <InputLabel htmlFor={`outlined-adornment-${label.split(' ').join('-')}`} required={required}>
      {label}
    </InputLabel>
    <OutlinedInput
      id={`outlined-adornment-${label.split(' ').join('-')}`}
      type={type}
      value={values}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      label={label}
      inputProps={{}}
    />
    {touched && errors && (
      <FormHelperText error id="standard-weight-helper-text-last-name">
        {errors}
      </FormHelperText>
    )}
  </FormControl>
);

export default React.memo(FormInput);
