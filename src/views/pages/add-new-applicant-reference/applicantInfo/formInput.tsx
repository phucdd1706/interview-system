import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

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
      onChange={handleChange}
      label={label}
      readOnly={readOnly}
      placeholder={label}
    />
    {touched && errors && !readOnly && (
      <FormHelperText error id="standard-weight-helper-text-last-name">
        {errors}
      </FormHelperText>
    )}
  </FormControl>
);

export default React.memo(FormInput);
