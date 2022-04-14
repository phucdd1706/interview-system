// THIRD-PARTY
import React from 'react';

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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';

import { postAdministrator } from 'store/slices/user';
import { gridSpacing } from 'store/constant';
import { SelectProps } from 'types/user';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface AddAdministratorProps {
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
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('UserName is required'),
  password: Yup.string().required('Password is required'),
  email: Yup.string().required('Email is required'),
  password_confirmation: Yup.string().required('Password Confirmation is required'),
  phone: Yup.string().required('Phone is required'),
  gender: Yup.string().required('Gender is required'),
  type: Yup.string().required('Type is required')
});
const AddAdministrator = ({ open, handleDrawerOpen }: AddAdministratorProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone: '',
      dob: '',
      gender: 'male',
      type: 1
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(postAdministrator(values));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Submit Success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
      handleDrawerOpen();
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
                    Add Admin
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
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      fullWidth
                      label="Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="username"
                      name="username"
                      fullWidth
                      label="Username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      name="email"
                      fullWidth
                      label="Email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="password"
                      name="password"
                      fullWidth
                      label="Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="password_confirmation"
                      name="password_confirmation"
                      fullWidth
                      label="Confirmation password"
                      onChange={formik.handleChange}
                      value={formik.values.password_confirmation}
                      error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                      helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="phone"
                      name="phone"
                      fullWidth
                      label="Phone"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DesktopDatePicker
                      label="Date of Birth"
                      value={formik.values.dob}
                      inputFormat="dd/MM/yyyy"
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
                    <AnimateButton>
                      <Button fullWidth variant="contained" type="submit">
                        Save
                      </Button>
                      <Button fullWidth variant="text" color="error">
                        Close
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

export default AddAdministrator;
