// THIRD-PARTY
import { forwardRef, SyntheticEvent } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps, TextField } from '@mui/material';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
// import { useDispatch } from 'store';

import { putAdministrator } from 'store/slices/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface EditAdminProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
  id: string;
}
const validationSchema = Yup.object({
  // name: Yup.string().required('Name is required'),
  // username: Yup.string().required('UserName is required'),
  // password: Yup.string().required('Password is required'),
  // email: Yup.string().required('Email is required'),
  // password_confirmation: Yup.string().required('Password Confirmation is required'),
  // phone: Yup.string().required('Phone is required'),
  // type: Yup.string().required('Type is required')
});
const EditAdmin = ({ open, handleCloseDialog, id }: EditAdminProps) => {
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
      if (id) {
        dispatch(putAdministrator(id, values));
        window.location.reload();
      }
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
          <DialogTitle>Edit Admin</DialogTitle>
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
                    id="username1"
                    fullWidth
                    label="Enter Username*"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="email" fullWidth label="Enter Email*" onChange={formik.handleChange} value={formik.values.email} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    fullWidth
                    label="Enter password*"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password_confirmation"
                    fullWidth
                    label="Enter password_confirmation*"
                    onChange={formik.handleChange}
                    value={formik.values.password_confirmation}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="phone" fullWidth label="Enter phone*" onChange={formik.handleChange} value={formik.values.phone} />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="type" fullWidth label="Enter type*" onChange={formik.handleChange} value={formik.values.type} />
                </Grid>
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

export default EditAdmin;
