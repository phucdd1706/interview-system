import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Autocomplete,
  TextField
} from '@mui/material';
import { IconX } from '@tabler/icons';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import AnimateButton from 'ui-component/extended/AnimateButton';

type keyType = 'firstName' | 'lastName' | 'email' | 'phone' | 'address' | 'salary' | 'notes';

const personalDetail = [
  {
    label: 'Name',
    render: [
      {
        key: 'firstName',
        label: 'First Name',
        type: 'text'
      },
      {
        key: 'lastName',
        label: 'Last Name',
        type: 'text'
      },
      {
        key: 'age',
        label: 'Age',
        type: 'number'
      }
    ]
  },
  {
    label: 'Contact',
    render: [
      {
        key: 'email',
        label: 'Email',
        type: 'email'
      },
      {
        key: 'phone',
        label: 'Phone Number',
        type: 'number'
      }
    ]
  },
  {
    label: 'Address',
    render: [
      {
        key: 'address',
        label: 'Address',
        type: 'text'
      }
    ]
  }
];

const EmployeeForm = () => {
  const [employeeForm, setEmployeeForm] = useState({
    firstName: 'Minh',
    lastName: 'Nguyen',
    email: 'Minhnv@beetsoft.com.vn',
    phone: '12342345',
    address: 'Minh Khai, Bắc Từ Liêm, Hà Nội',
    applyPosition: [
      {
        id: uuidv4(),
        positionName: 'ReactJS',
        level: 'Senior'
      }
    ],
    salary: '',
    notes: ''
  });

  const AddMoreApplyPosition = () => {
    setEmployeeForm({ ...employeeForm, applyPosition: [...employeeForm.applyPosition, { id: uuidv4(), positionName: '', level: '' }] });
  };

  const RemoveApplyPosition = (index: number) => {
    const newApplyPosition = [...employeeForm.applyPosition];
    newApplyPosition.splice(index, 1);
    setEmployeeForm({ ...employeeForm, applyPosition: newApplyPosition });
  };

  useEffect(() => {
    console.log('employeeForm', employeeForm);
  }, [employeeForm]);

  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={employeeForm}
        // validationSchema={Yup.object().shape({
        //   name: Yup.string().trim('Must be a valid name').max(255).required('name is required')
        // })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log('values', values);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {personalDetail.map((row: { label: string; render: { key: string; label: string; type: string }[] }) => {
              const { render } = row;
              return (
                <Stack direction="row" spacing={2} sx={{ padding: '1em 0' }} key={row.label}>
                  {render.map((item: { key: string; label: string; type: string }) => {
                    const key: keyType = item.key as keyType;
                    const { label, type } = item;
                    return (
                      <FormControl fullWidth error={Boolean(touched[key] && errors[key])} key={`${row.label}-${label}`}>
                        <InputLabel htmlFor={`outlined-adornment-${row.label}-${label}`}>{label}</InputLabel>
                        <OutlinedInput
                          id={`outlined-adornment-${row.label}-${label}`}
                          type={type}
                          value={values[key]}
                          name={key}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label={label}
                          inputProps={{}}
                        />
                        {touched[key] && errors[key] && (
                          <FormHelperText error id="standard-weight-helper-text-last-name">
                            {errors[key]}
                          </FormHelperText>
                        )}
                      </FormControl>
                    );
                  })}
                </Stack>
              );
            })}
            <Box>
              {values.applyPosition.map((item: { id: string; positionName: string; level: string }, index: number) => (
                <Stack direction="row" alignItems="center" spacing={2} sx={{ padding: '1em 0' }} key={item.id}>
                  <Autocomplete
                    id="tags-standard"
                    options={jobPosition}
                    // value={{ title: item.positionName }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => <TextField {...params} variant="standard" label="Apply Position" placeholder="Favorites" />}
                    sx={{ flexGrow: 1 }}
                  />
                  <Autocomplete
                    id="tags-standard"
                    options={jobLevel}
                    // value={{ title: item.level }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => <TextField {...params} variant="standard" label="Level" placeholder="Favorites" />}
                    sx={{ flexGrow: 1 }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      RemoveApplyPosition(index);
                    }}
                    sx={{ borderRadius: 9999, width: '32px', height: '32px', padding: 0, minWidth: 'auto' }}
                  >
                    <IconX />
                  </Button>
                </Stack>
              ))}
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Button variant="outlined" onClick={AddMoreApplyPosition}>
                  + Add more position
                </Button>
              </Stack>
            </Box>
            <Box sx={{ mt: 2, width: 'fit-content' }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Get Interview Question
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EmployeeForm;

const jobPosition = [
  { title: 'ReactJS' },
  { title: 'NodeJS' },
  { title: 'AngularJS' },
  { title: 'VueJS' },
  { title: 'React Native' },
  { title: 'Ionic' },
  { title: 'Flutter' },
  { title: 'ExpressJS' },
  { title: 'Laravel' },
  { title: 'Django' },
  { title: 'Ruby on Rails' },
  { title: 'PHP' }
];

const jobLevel = [{ title: 'Senior' }, { title: 'Middle' }, { title: 'Junior' }, { title: 'Intern' }];
