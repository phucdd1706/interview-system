/* eslint-disable @typescript-eslint/no-unused-vars */
// THIRD-PARTY
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import * as yup from 'yup';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { dispatch } from 'store';
import { editCustomer } from 'store/slices/customer';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { SelectProps } from 'types/customer';
import { UserProfile } from 'types/user-profile';
import { useState } from 'react';
import { isEmail, isFullName, isPhone, isUserName, passwordRegEx } from 'utils/regexHelper';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  customer: UserProfile;
  open: boolean;
  editing: boolean;
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
  },
  {
    value: 2,
    label: 'Blocked'
  }
];

const validationSchema = yup.object({
  name: yup
    .string()
    .max(50, 'Maximum 50 characters')
    .min(3, 'Minimum 3 characters')
    .matches(isFullName, 'Sorry, only letters (a-z) are allowed ')
    .required('Name is required'),
  username: yup
    .string()
    .max(50, 'Maximum 50 characters')
    .matches(isUserName, 'The username must only contain letters, numbers, dashes and underscores.')
    .required('Username is required'),
  email: yup
    .string()
    .max(50, 'Maximum 50 characters')
    .matches(
      isEmail,
      'Sorry, first character of email must be an letters (a-z) or number (0-9), letters(a-z), numbers (0-9), periods (.) are allowed'
    )
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup.string().required('Phone is required').matches(isPhone, 'Enter the correct format phone'),
  password: yup.string().min(6, 'Minimum 6 characters').matches(passwordRegEx, 'only a-z, 0-9 allowed'),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Password do not match'),
  gender: yup.string().required('Gender is required'),
  type: yup.string().required('Type is required'),
  status: yup.string().required('Status is required')
});

const EditCustomer = ({ customer, open, editing, handleDrawerOpen }: Props) => {
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
  const EditCus = (values: UserProfile) => {
    dispatch(
      editCustomer({
        id: customer.id,
        params: values,
        callback: (res) => {
          if (res?.data?.success) {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Updated successfully!',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: true
              })
            );
            changeModal('close');
          } else {
            dispatch(
              openSnackbar({
                open: true,
                message: res?.errors?.username || res?.errors?.email || res?.errors?.phone,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                  color: 'error'
                },
                close: true
              })
            );
            setErrors(res?.errors);
          }
        }
      })
    );
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: customer.id,
      name: customer.name,
      username: customer.username,
      password: '',
      password_confirmation: '',
      email: customer.email,
      phone: customer.phone,
      dob: customer.dob,
      gender: customer.gender ?? 'none',
      type: customer.type,
      status: customer.status
    },
    validationSchema,
    onSubmit: (values) => {
      EditCus(values);
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
                    {`${editing ? 'Edit' : 'Customer'} ${customer.name}`}
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
          <form onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      inputProps={{ readOnly: !editing }}
                      id="name"
                      name="name"
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
                      inputProps={{ readOnly: !editing }}
                      id="username"
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
                      inputProps={{ readOnly: !editing }}
                      id="email"
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
                  {editing && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="password"
                          name="password"
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
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
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          error={(formik.touched.password && Boolean(formik.errors.password)) || errors?.password}
                          helperText={(formik.touched.password && formik.errors.password) || errors?.password}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="password_confirmation"
                          name="password_confirmation"
                          label="Confirm Password"
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
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
                          value={formik.values.password_confirmation}
                          onChange={formik.handleChange}
                          error={
                            (formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)) ||
                            errors?.password_confirmation
                          }
                          helperText={
                            (formik.touched.password_confirmation && formik.errors.password_confirmation) || errors?.password_confirmation
                          }
                        />
                      </Grid>
                    </>
                  )}
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
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DesktopDatePicker
                      readOnly={!editing}
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
                        readOnly={!editing}
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
                        readOnly={!editing}
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
                        readOnly={!editing}
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

export default EditCustomer;
