/* eslint-disable @typescript-eslint/no-unused-vars */
// THIRD-PARTY
import React, { useEffect } from 'react';
import {
  Grid,
  Button,
  FormControl,
  FormHelperText,
  Paper,
  CardHeader,
  TextField,
  Snackbar,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import useAuth from 'hooks/useAuth';
import { dispatch, useSelector } from 'store';
import { changeNewPassword, getProfile } from 'store/slices/profile';
import { ChangePassword } from 'types/profile';
import { openSnackbar } from 'store/slices/snackbar';
import { passwordRegEx } from 'utils/regexHelper';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone is required'),
  gender: yup.string().required('Gender is required'),
  oldpassword: yup
    .string()
    .trim()
    .min(6, 'Minimum 6 characters')
    .matches(passwordRegEx, 'only a-z, 0-9 allowed')
    .required('Old Password is required'),
  password: yup
    .string()
    .trim()
    .min(6, 'Minimum 6 characters')
    .matches(passwordRegEx, 'only a-z, 0-9 allowed')
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password do not match')
    .required('Confirm password is required')
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function ChangePasswordd() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // const { user } = useAuth();
  const user = useSelector((state) => state.profile.userProfile);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickChange = () => {
    setOpen(true);
    formik.resetForm();
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const changePass = (values: ChangePassword) => {
    dispatch(
      changeNewPassword({
        params: values,
        callback: (res) => {
          if (res?.data?.success) {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Change Password Success',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: true
              })
            );
            handleClickChange();
          }
        }
      })
    );
  };
  const formik = useFormik({
    initialValues: {
      name: user?.name,
      phone: user?.phone,
      dob: user?.dob,
      gender: user?.gender,
      oldpassword: '',
      password: '',
      password_confirmation: ''
    },
    validationSchema,
    onSubmit: (values) => {
      changePass(values);
    }
  });
  return (
    <Paper>
      <MainCard>
        <CardHeader
          title="Change Password"
          sx={{
            borderBottom: '1px solid'
            // borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
            // ':hover': {
            //   boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)'
            // }
          }}
        />
        <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container rowSpacing={2} columnSpacing={gridSpacing} sx={{ mt: 0.25 }}>
            <Grid item xs={6}>
              <FormControl fullWidth error={Boolean(formik.touched.password && formik.errors.password)}>
                {/* <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel> */}
                <TextField
                  id="oldpassword"
                  value={formik.values.oldpassword}
                  type={showPassword ? 'text' : 'password'}
                  name="oldpassword"
                  onChange={formik.handleChange}
                  label={
                    <span>
                      <span style={{ color: '#f44336' }}>*</span> Old Password
                    </span>
                  }
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
                />
                {formik.touched.password && formik.errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {formik.errors.password}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography> </Typography>
            </Grid>
          </Grid>
          <Grid container rowSpacing={2} columnSpacing={gridSpacing} sx={{ mt: 0.25 }}>
            <Grid item xs={6}>
              <FormControl fullWidth error={Boolean(formik.touched.password && formik.errors.password)}>
                {/* <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel> */}
                <TextField
                  id="password"
                  value={formik.values.password}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={formik.handleChange}
                  label={
                    <span>
                      <span style={{ color: '#f44336' }}>*</span> New Password
                    </span>
                  }
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
                />
                {formik.touched.password && formik.errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {formik.errors.password}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={Boolean(formik.touched.password_confirmation && formik.errors.password_confirmation)}>
                {/* <InputLabel htmlFor="outlined-adornment-retype-password">Retype New Password</InputLabel> */}
                <TextField
                  id="password_confirmation"
                  value={formik.values.password_confirmation}
                  type={showPassword ? 'text' : 'password'}
                  name="password_confirmation"
                  onChange={formik.handleChange}
                  label={
                    <span>
                      <span style={{ color: '#f44336' }}>*</span> Confirm password
                    </span>
                  }
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
                />
                {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {formik.errors.password_confirmation}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={gridSpacing} sx={{ mt: 2 }}>
            <Grid item>
              <Button size="large" type="submit" variant="contained" color="primary">
                Change Password
              </Button>
            </Grid>
            <Grid item>
              <Button size="large" type="reset" variant="outlined" color="error" onClick={(e) => formik.resetForm()}>
                Clear
              </Button>
            </Grid>
            {/* <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Change Password Successfully!
              </Alert>
            </Snackbar> */}
          </Grid>
        </form>
      </MainCard>
    </Paper>
  );
}
