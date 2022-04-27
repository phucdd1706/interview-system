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
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { Administrator, SelectProps, UserFilter } from 'types/user';
import { addAdministrator, getAdministratorList } from 'store/slices/user';
import { useState } from 'react';
import moment from 'moment';

interface Props {
  open: boolean;
  filter: UserFilter;
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
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password_confirmation must match')
    .required('Password_confirmation is required'),
  phone: yup
    .string()
    .matches(
      /^(\+84[9|8|7|5|3]|0[9|8|7|5|3]|84[9|8|7|5|3])+([0-9]{2})+([ ]?)+([0-9]{3})+([ ]?)+([0-9]{3})\b$/i,
      'Enter the correct format phone'
    )
    .required('Phone is required'),
  gender: yup.string().required('Gender is required'),
  type: yup.string().required('Type is required')
});

const AddAdministrator = ({ open, handleDrawerOpen, filter }: Props) => {
  const [errors, setErrors] = useState<any>({});
  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      setErrors({});
      formik.resetForm();
    }
  };
  const addAdmin = (values: Administrator) => {
    dispatch(
      addAdministrator({
        params: values,
        callback: (resp) => {
          if (resp?.data?.success) {
            dispatch(getAdministratorList(filter));
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
                message: resp?.message,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                  color: 'error'
                },
                close: true
              })
            );
            setErrors(resp?.errors);
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
      dob: moment().format('L'),
      gender: 'male',
      type: 1
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
                    Add Administrator
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
                      error={(formik.touched.password_confirmation && Boolean(formik.errors?.password_confirmation)) || errors.password}
                      helperText={(formik.touched.password_confirmation && formik.errors.password_confirmation) || errors?.password}
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

export default AddAdministrator;
