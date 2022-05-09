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
import { addCustomers } from 'store/slices/customer';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { SelectProps } from 'types/customer';
import { useState } from 'react';
import { UserProfile } from 'types/user-profile';
import { isEmail, isFullName, isPhone, isUserName } from 'utils/regexHelper';

interface Props {
  open: boolean;
  handleDrawerOpen: () => void;
}

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
  password: yup.string().trim().min(6, 'Minimum 6 characters').required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password do not match')
    .required('Confirm password is required'),
  dob: yup.string().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required'),
  type: yup.string().required('Type is required')
});

const AddCustomer = ({ open, handleDrawerOpen }: Props) => {
  const [errors, setErrors] = useState<any>({});
  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      setErrors({});
      formik.resetForm();
    }
  };
  const addCus = (values: UserProfile) => {
    dispatch(
      addCustomers({
        params: values,
        callback: (res) => {
          if (res?.data?.success) {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Submit Success',
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
                message: res?.message,
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
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone: '',
      dob: '',
      gender: 'male',
      type: 2
    },
    validationSchema,
    onSubmit: (values) => {
      addCus(values);
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
                    Add Customer
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
                      id="username"
                      name="username"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> User Name
                        </span>
                      }
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={(formik.touched.username && Boolean(formik.errors.username)) || errors?.username}
                      helperText={(formik.touched.username && formik.errors.username) || errors?.username}
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
                      error={(formik.touched.email && Boolean(formik.errors.email)) || errors?.email}
                      helperText={(formik.touched.email && formik.errors.email) || errors?.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      type="password"
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Confirm password
                        </span>
                      }
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
                      error={(formik.touched.phone && Boolean(formik.errors.phone)) || errors?.phone}
                      helperText={(formik.touched.phone && formik.errors.phone) || errors?.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DesktopDatePicker
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Date of Birth
                        </span>
                      }
                      value={formik.values.dob}
                      inputFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      onChange={(date) => {
                        formik.setFieldValue('dob', date);
                      }}
                      renderInput={(props) => (
                        <TextField
                          error={(formik.touched.dob && Boolean(formik.errors.dob)) || errors?.dob}
                          helperText={(formik.touched.dob && formik.errors.dob) || errors?.dob}
                          fullWidth
                          {...props}
                        />
                      )}
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

export default AddCustomer;
