import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, TextField } from '@mui/material';

const FormInput = ({ errors, handleBlur, handleChange, touched, values, label, required, type, name, readOnly }: any) => (
  <FormControl fullWidth error={Boolean(touched && errors && !readOnly)}>
    <TextField
      id={`outlined-adornment-${label.split(' ').join('-')}`}
      type={type}
      required={required}
      onBlur={(e) => {
        console.log(e.target.value);
      }}
      InputProps={type === 'number' ? { inputProps: { min: 0, max: 10, readOnly } } : { readOnly }}
      value={values}
      name={name}
      onChange={handleChange}
      label={label}
      placeholder={label}
      InputLabelProps={type === 'datetime-local' ? { shrink: true } : {}}
    />
    {touched && errors && !readOnly && (
      <FormHelperText error id="standard-weight-helper-text-last-name">
        {errors}
      </FormHelperText>
    )}
  </FormControl>
);

export default React.memo(FormInput);
