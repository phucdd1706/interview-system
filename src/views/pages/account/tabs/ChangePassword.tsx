/* eslint-disable @typescript-eslint/no-unused-vars */
// THIRD-PARTY
import React from 'react';
import { Grid, Button, FormControl, FormHelperText, Paper, CardHeader, TextField, Snackbar } from '@mui/material';
import { useTheme } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import useAuth from 'hooks/useAuth';
import { dispatch } from 'store';
import { changeNewPassword } from 'store/slices/profile';
import { ChangePassword } from 'types/profile';
import { openSnackbar } from 'store/slices/snackbar';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required')
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function ChangePasswordd() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();

  // const handleClickShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

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
      password: '',
      password_confirmation: ''
    },
    validationSchema,
    onSubmit: (values) => {
      changePass(values);
      handleClickChange();
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
                  id="password"
                  value={formik.values.password}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  onChange={formik.handleChange}
                  label="Password"
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
                  label="Password Confirmation"
                  inputProps={{}}
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
