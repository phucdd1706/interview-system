// THIRD-PARTY

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
// import { useDispatch } from 'store';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { putAdministrator } from 'store/slices/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SelectProps } from 'types/user';
import { openSnackbar } from 'store/slices/snackbar';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { dispatch } from 'store';
import { UserProfile } from 'types/user-profile';

// const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface EditAdminProps {
  user: UserProfile;
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
  },
  {
    value: 2,
    label: 'Blocked'
  }
];
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('UserName is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  // password: Yup.string().required('Password is required'),
  // password_confirmation: Yup.string().required('Password Confirmation is required'),
  gender: Yup.string().required('Gender is required'),
  phone: Yup.string().required('Phone is required'),
  type: Yup.string().required('Type is required'),
  status: Yup.string().required('Status is required')
});
const EditAdmin = ({ user, open, handleDrawerOpen }: EditAdminProps) => {
  const formik = useFormik({
    initialValues: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender ?? 'none',
      type: user.type,
      status: user.status
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(putAdministrator(values));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Updated successfully!',
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
                    {`Edit "${user.name}"`}
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="email" name="email" fullWidth label="Email" onChange={formik.handleChange} value={formik.values.email} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField id="phone" fullWidth label="Phone" onChange={formik.handleChange} value={formik.values.phone} />
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

export default EditAdmin;
