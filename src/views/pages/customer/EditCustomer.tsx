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
import { editCustomer } from 'store/slices/customer';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { SelectProps } from 'types/customer';
import { UserProfile } from 'types/user-profile';
import { useState } from 'react';

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
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().min(6, 'your password must be at least 6 character'),
  password_confirmation: yup
    .string()
    .min(6, 'your password must be at least 6 character')
    .oneOf([yup.ref('password'), null], 'Password must match'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  gender: yup.string().required('Gender is required'),
  type: yup.string().required('Type is required'),
  status: yup.string().required('Status is required')
});

const EditCustomer = ({ customer, open, editing, handleDrawerOpen }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
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
                      label="Name"
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
                      label="User Name"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={(formik.touched.username && Boolean(formik.errors.username)) || errors?.username}
                      helperText={(formik.touched.username && formik.errors.username) || errors?.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      inputProps={{ readOnly: !editing }}
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={(formik.touched.email && Boolean(formik.errors.email)) || errors?.email}
                      helperText={(formik.touched.email && formik.errors.email) || errors?.email}
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
                      label="Phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={(formik.touched.phone && Boolean(formik.errors.phone)) || errors?.phone}
                      helperText={(formik.touched.phone && formik.errors.phone) || errors?.phone}
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
