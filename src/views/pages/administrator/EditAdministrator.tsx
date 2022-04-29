import React, { useState } from 'react';
// THIRD-PARTY
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import * as yup from 'yup';
import { useFormik } from 'formik';

import AnimateButton from 'ui-component/extended/AnimateButton';

// PROJECT IMPORTS
import { dispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { editAdministrator } from 'store/slices/user';

import { UserProfile } from 'types/user-profile';
import { Administrator, SelectProps } from 'types/user';

interface Props {
  administrator: UserProfile;
  open: boolean;
  handleDrawerOpen: () => void;
}

const Type: SelectProps[] = [
  {
    value: 1,
    label: 'Administrator'
  },
  {
    value: 2,
    label: 'Customer'
  }
];

const Gender: SelectProps[] = [
  {
    value: 'none',
    label: 'N/A'
  },
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];

const Status: SelectProps[] = [
  {
    value: 0,
    label: 'Inactive'
  },
  {
    value: 1,
    label: 'Active'
  }
];

const validationSchema = yup.object({
  name: yup.string().max(255, 'Maximum 255 characters').required('Name is required'),
  username: yup.string().max(255, 'Maximum 255 characters').required('Username is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup
    .string()
    .min(10, 'Minimum 10 characters ')
    .max(10, 'Maximum 10 characters ')
    .matches(/^(\+84[9|8|7|5|3]|0[9|8|7|5|3]|84[9|8|7|5|3])+([0-9]{2})+([ ]?)+([0-9]{3})+([ ]?)+([0-9]{3})\b$/i, 'Enter a valid phone')
    .required('Phone is required'),
  gender: yup.string().required('Gender is required'),
  type: yup.string().required('Type is required'),
  status: yup.string().required('Status is required')
});

const EditAdministrator = ({ administrator, open, handleDrawerOpen }: Props) => {
  const [errors, setErrors] = useState<any>({});

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      setErrors({});
      formik.resetForm();
    }
  };
  const Notification = (color: string, message: string) => {
    dispatch(
      openSnackbar({
        open: true,
        message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: { color },
        close: true
      })
    );
  };
  const EditAdmin = (values: Administrator) => {
    dispatch(
      editAdministrator({
        id: administrator.id,
        params: values,
        callback: (resp) => {
          if (resp?.data?.success) {
            Notification('success', 'Edit record successfully!');
            changeModal('close');
          } else {
            Notification('error', resp?.message);
            setErrors(resp?.errors);
          }
        }
      })
    );
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: administrator.id,
      name: administrator.name,
      username: administrator.username,
      email: administrator.email,
      phone: administrator.phone,
      dob: administrator.dob,
      gender: administrator.gender ?? 'none',
      type: administrator.type,
      status: administrator.status
    },
    validationSchema,
    onSubmit: (values) => {
      EditAdmin(values);
    }
  });

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleDrawerOpen();
        formik.resetForm();
      }}
      sx={{
        '&>div:nth-of-type(3)': {
          '&>div': {
            m: 0,
            borderRadius: '0px',
            width: 850,
            maxWidth: 850,
            maxHeight: '100%'
          }
        }
      }}
    >
      {open && (
        <>
          <Box sx={{ p: 3 }}>
            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
              <Grid item sx={{ width: 'calc(100% - 50px)' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Button
                    variant="text"
                    color="error"
                    sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                    onClick={handleDrawerOpen}
                  >
                    <HighlightOffIcon />
                  </Button>
                  <Typography
                    variant="h4"
                    sx={{
                      display: 'inline-block',
                      width: 'calc(100% - 34px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      verticalAlign: 'middle'
                    }}
                  >
                    {`Edit "${administrator.name}"`}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Name
                        </span>
                      }
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={(formik.touched.name && Boolean(formik.errors.name)) || errors.name}
                      helperText={(formik.touched.name && formik.errors.name) || errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="username"
                      name="username"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> User Name
                        </span>
                      }
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={(formik.touched.username && Boolean(formik.errors.username)) || errors.username}
                      helperText={(formik.touched.username && formik.errors.username) || errors.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Email
                        </span>
                      }
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={(formik.touched.email && Boolean(formik.errors.email)) || errors.email}
                      helperText={(formik.touched.email && formik.errors.email) || errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Phone
                        </span>
                      }
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={(formik.touched.phone && Boolean(formik.errors.phone)) || errors.phone}
                      helperText={(formik.touched.phone && formik.errors.phone) || errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DesktopDatePicker
                      label="Date of Birth"
                      value={formik.values.dob}
                      inputFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      onChange={(date) => {
                        formik.setFieldValue('dob', date);
                      }}
                      renderInput={(props) => <TextField fullWidth {...props} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Select
                        id="gender"
                        name="gender"
                        displayEmpty
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {Gender.map((gender: SelectProps, index: number) => (
                          <MenuItem key={index} value={gender.value}>
                            {gender.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Select
                        id="type"
                        name="type"
                        displayEmpty
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {Type.map((type: SelectProps, index: number) => (
                          <MenuItem key={index} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Select
                        id="status"
                        name="status"
                        displayEmpty
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {Status.map((status: SelectProps, index: number) => (
                          <MenuItem key={index} value={status.value}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button fullWidth variant="contained" type="submit">
                        Save
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </DialogContent>
            </LocalizationProvider>
          </form>
        </>
      )}
    </Dialog>
  );
};

export default EditAdministrator;
