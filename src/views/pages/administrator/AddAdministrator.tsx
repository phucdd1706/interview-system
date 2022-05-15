import React, { useState } from 'react';
// THIRD-PARTY
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import AnimateButton from 'ui-component/extended/AnimateButton';

import * as yup from 'yup';
import { useFormik } from 'formik';

// PROJECT IMPORTS
import { dispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { addAdministrator, editAdministrator, getAdministratorList } from 'store/slices/user';

import { Administrator, SelectProps, UserFilter } from 'types/user';
import { isEmail, isFullName, isPhone, isUserName, passwordRegEx } from 'utils/regexHelper';

interface Props {
  open: boolean;
  adminFilter: UserFilter;
  administrator: Administrator;
  editing?: boolean;
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
const initDate = new Date().toDateString();
const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must have at least 2 characters')
    .max(50, `Maximum characters allowed is 50`)
    .matches(isFullName, 'Sorry, only letters (a-z) are allowed ')
    .required('Name is required'),
  username: yup
    .string()
    .trim()
    .max(50, `Maximum characters allowed is 50`)
    .matches(isUserName, 'The username must only contain letters, numbers, dashes and underscores.')
    .required('Username is required'),
  email: yup
    .string()
    .trim()
    .max(50, `Maximum characters allowed is 50`)
    .matches(
      isEmail,
      'Sorry, first character of email must be an letters (a-z) or number (0-9), letters(a-z), numbers (0-9), periods (.) are allowed'
    )
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup.string().trim().required('Phone is required').max(11).matches(isPhone, 'Enter the correct format phone'),
  password: yup.string().trim().min(6).max(255).required('Password is required'),
  password_confirmation: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], 'Password do not match')
    .required('Confirm password is required'),
  gender: yup.string().required('Gender is required'),
  dob: yup.date().required('Date of Birth is required').nullable(),
  type: yup.string().required('Type is required')
});

const AddAdministrator = ({ open, editing, handleDrawerOpen, adminFilter, administrator }: Props) => {
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      setShowPassword(false);
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
        alert: {
          color
        },
        close: true
      })
    );
  };

  const addAdmin = (values: Administrator) => {
    if (administrator?.id) {
      dispatch(
        editAdministrator({
          id: administrator?.id,
          params: values,
          callback: (resp) => {
            if (resp?.data?.success) {
              Notification('success', 'Edit administrator successfully!');
              changeModal('close');
            } else {
              Notification('error', resp?.errors?.username || resp?.errors?.email || resp?.errors?.phone);
              setErrors(resp?.errors);
            }
          }
        })
      );
    } else {
      dispatch(
        addAdministrator({
          params: values,
          callback: (resp) => {
            if (resp?.data?.success) {
              dispatch(getAdministratorList(adminFilter));
              Notification('success', 'Add administrator successfully!');
              changeModal('close');
            } else {
              Notification('error', resp?.errors?.username || resp?.errors?.email || resp?.errors?.phone);
              setErrors(resp?.errors);
            }
          }
        })
      );
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: administrator?.name,
      username: administrator?.username,
      email: administrator?.email,
      password: administrator?.id ? 'tuansnn' : '',
      password_confirmation: administrator?.id ? 'tuansnn' : '',
      phone: administrator?.phone,
      dob: administrator?.dob || initDate,
      gender: administrator?.gender || 'male',
      status: administrator?.id ? administrator?.status : 1,
      type: administrator?.id ? administrator?.type : 1
    },
    validationSchema,
    onSubmit: (values) => {
      addAdmin(values);
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
              <Grid item sx={{ width: '100%' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
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
                    {administrator?.id ? `Edit "${administrator?.name}"` : `Add Administrator`}
                  </Typography>
                  <Button
                    variant="text"
                    color="error"
                    sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                    onClick={handleDrawerOpen}
                  >
                    <HighlightOffIcon />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <form noValidate onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      inputProps={{ readOnly: !editing }}
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Name
                        </span>
                      }
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={(formik.touched.name && Boolean(formik.errors.name)) || errors?.name}
                      helperText={(formik.touched.name && formik.errors.name) || errors?.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="username"
                      inputProps={{ readOnly: !editing }}
                      name="username"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> User Name
                        </span>
                      }
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      inputProps={{ readOnly: !editing }}
                      name="email"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Email
                        </span>
                      }
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  {!administrator.id && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        InputProps={{
                          readOnly: !editing,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        type={showPassword ? 'text' : 'password'}
                        label={
                          <span>
                            <span style={{ color: '#f44336' }}>*</span> Password
                          </span>
                        }
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={(formik.touched.password && Boolean(formik.errors.password)) || errors?.password}
                        helperText={(formik.touched.password && formik.errors.password) || errors?.password}
                      />
                    </Grid>
                  )}
                  {!administrator.id && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="password_confirmation"
                        name="password_confirmation"
                        InputProps={{
                          readOnly: !editing,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        type={showPassword ? 'text' : 'password'}
                        label={
                          <span>
                            <span style={{ color: '#f44336' }}>*</span> Confirm password
                          </span>
                        }
                        value={formik.values.password_confirmation}
                        onChange={formik.handleChange}
                        error={(formik.touched.password_confirmation && Boolean(formik.errors?.password_confirmation)) || errors.password}
                        helperText={(formik.touched.password_confirmation && formik.errors.password_confirmation) || errors?.password}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="phone"
                      inputProps={{ readOnly: !editing }}
                      name="phone"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Phone
                        </span>
                      }
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DesktopDatePicker
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Date of Birth
                        </span>
                      }
                      // label="Date of Birth"
                      value={formik.values.dob}
                      inputFormat="dd/MM/yyyy"
                      allowSameDateSelection
                      maxDate={new Date()}
                      onChange={(date) => {
                        formik.setFieldValue('dob', date);
                      }}
                      renderInput={(props) => (
                        <TextField
                          fullWidth
                          {...props}
                          error={formik.values.dob === null}
                          helperText={formik.touched.dob && formik.errors.dob}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        id="gender"
                        name="gender"
                        readOnly={!editing}
                        label="Gender"
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
                  {administrator.id && (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          id="status"
                          readOnly={!editing}
                          name="status"
                          label="Status"
                          displayEmpty
                          value={formik?.values?.status}
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
                  )}
                  {administrator.id && (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                          id="type"
                          readOnly={!editing}
                          name="type"
                          label="Type"
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
                  )}
                  {editing && (
                    <Grid item xs={12}>
                      <AnimateButton>
                        <Button fullWidth variant="contained" type="submit">
                          Save
                        </Button>
                      </AnimateButton>
                    </Grid>
                  )}
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
