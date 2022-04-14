// THIRD-PARTY
import React, { forwardRef, SyntheticEvent } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';

import { postAdministrator } from 'store/slices/user';
import { gridSpacing } from 'store/constant';
import { useDispatch } from 'react-redux';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface AddAdministratorProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('UserName is required'),
  password: Yup.string().required('Password is required'),
  email: Yup.string().required('Email is required'),
  password_confirmation: Yup.string().required('Password Confirmation is required'),
  phone: Yup.string().required('Phone is required'),
  type: Yup.string().required('Type is required')
});
const AddAdministrator = ({ open, handleCloseDialog }: AddAdministratorProps) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone: '',
      type: 1
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(postAdministrator(values));
      window.location.reload();
    }
  });
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
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
          <DialogTitle>Add Administrator</DialogTitle>
          <form onSubmit={formik.handleSubmit}>
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
                    label="Enter Name*"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="username"
                    fullWidth
                    label="Enter Username*"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    fullWidth
                    label="Enter Email*"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    fullWidth
                    label="Enter password*"
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
                    fullWidth
                    label="Enter password_confirmation*"
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
                    fullWidth
                    label="Enter phone*"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    id="type"
                    fullWidth
                    label="Enter type*"
                    onChange={formik.handleChange}
                    value={formik.values.type}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    helperText={formik.touched.type && formik.errors.type}
                  />
                </Grid> */}
              </Grid>
            </DialogContent>
            <DialogActions>
              <AnimateButton>
                <Button variant="contained" type="submit">
                  Create
                </Button>
              </AnimateButton>
              <Button variant="text" color="error" onClick={handleCloseDialog}>
                Close
              </Button>
            </DialogActions>
          </form>
        </>
      )}
    </Dialog>
  );
};

export default AddAdministrator;
