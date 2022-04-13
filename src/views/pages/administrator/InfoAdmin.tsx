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
  const { users } = useSelector((state) => state.user);
  const userById = users.filter((item) => item.id === id);
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
  // useEffect(() => {
  //   if (id) {
  //     dispatch(getDetailAdministrator());
  //     console.log(1111, id);
  //   }
  // }, [dispatch, id]);

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
                  <TextField id="name1" fullWidth label="Enter Name*" defaultValue={userById[0].name} />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="username1" fullWidth label="Enter Username*" defaultValue={userById[0].username} />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="email1" fullWidth label="Enter Email*" defaultValue={userById[0].email} />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="password1" fullWidth label="Enter password*" defaultValue={userById[0].username} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="passwordConfirmation1"
                    fullWidth
                    label="Enter password_confirmation*"
                    defaultValue={userById[0].username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="phone1" fullWidth label="Enter phone*" defaultValue={userById[0].phone} />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="typ1e" fullWidth label="Enter type*" defaultValue={userById[0].type} />
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
