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

const FormInput = ({ errors, handleBlur, handleChange, touched, values, label, required, type, name, readOnly }: any) => (
  <FormControl fullWidth error={Boolean(touched && errors && !readOnly)}>
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
      readOnly={readOnly}
    />
    {touched && errors && !readOnly && (
      <FormHelperText error id="standard-weight-helper-text-last-name">
        {errors}
      </FormHelperText>
    )}
  </FormControl>
);

export default React.memo(FormInput);
