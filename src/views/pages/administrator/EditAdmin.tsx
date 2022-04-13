// THIRD-PARTY
import { forwardRef, SyntheticEvent, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps, TextField } from '@mui/material';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'store';

import { getDetailAdministrator, putAdministrator } from 'store/slices/user';
import { Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { UserProfile } from 'types/user-profile';
import { useDispatch } from 'react-redux';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface InfoAdminProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
  id: string;
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
const InfoAdmin = ({ open, handleCloseDialog, id }: InfoAdminProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const { users } = useSelector((state) => state.user);
  // const userById = users.filter((item) => item.id === id);
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
        dispatch(putAdministrator(values));
      }
    }
  });
  useEffect(() => {
    if (id) {
      dispatch(getDetailAdministrator());
      console.log(1111, id);
    }
  }, [dispatch, id]);

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
                  <TextField id="name" fullWidth label="Enter Name*" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="username" fullWidth label="Enter Username*" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="email" fullWidth label="Enter Email*" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="password" fullWidth label="Enter password*" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="passwordConfirmation" fullWidth label="Enter password_confirmation*" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="phone" fullWidth label="Enter phone*" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="type" fullWidth label="Enter type*" />
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

export default InfoAdmin;
