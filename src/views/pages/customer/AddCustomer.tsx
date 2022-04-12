// THIRD-PARTY
import { forwardRef, SyntheticEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface AddAdministratorProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
}

const AddAdministrator = ({ open, handleCloseDialog }: AddAdministratorProps) => {
  const theme = useTheme();
  const headers = {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGU2MWJhODNiOWY2NzBlMDQzZTFkZDA0ZjIzNGMzOTFhZGZlYjY3NjlmMGI4ZDYzOGEyZDZiNDdiNWEwYjQwYzI1MDM2OTNkMjQ5Zjc0ZjIiLCJpYXQiOjE2NDkyMTY5NzkuODU1MzksIm5iZiI6MTY0OTIxNjk3OS44NTUzOTQsImV4cCI6MTY4MDc1Mjk3OS44NTMxMzMsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.j5-M9VEwkGM4AUui5q137jrgJBBoLw_K0aZFO8RhgBF4BbLqHfz3NJIIDycLorHerO5XE2QK1B6yOgk8ZjQSs38GyK-fd-wi9Ig7C4ASfRWUKZKOo518dsKSXB7lf-JWV74iHrv8CnKiWZsweEpe0zp38Ji1ACoT_2e_FdKKp8gFcSkoxM-QVCzkaNG34By9ZcBqTQCzXj7g7RpT52It5gKJluRf_dE6F9sDVRVnAi-V8QLQ0s8uEe9W4bnrb6SXwkzi5sAhYcBciyiuUEO8xq63SFHPoYqM_hzZJK3zUxhwqmNcuIG7jROTCTqBy2Fr5-NdvJC3P_KGaGKQ7clb8RzIPFGD7Ozk4kV8eYALwG1mKIIx2WB9GCCFtX0k7y0jzTQAEHpEqEolYmDWugPlNeUkuCIP8N4ET_lHQ7Ymc8f6slLEnAtYCjghyfIO9zKaX4aOPufkdlSnHr2LNbH-Fc7zptcNdzRuBm1ew8L56lxboBFK5mW9lO4_N0TNlSlsGl-nodokpO6hFwiuuMiSmaxkzuoFX04vxIwoYt_gl42WnWFCziRztbR_51WG6NzoJVTJXX34f-5L8MrVX2r0T4p9Yhx_YJAlh69Q60V60odR-8kjC5wr7w_SNF-ihSGwZST-O6LA-69kuK2upR01bTzWXTwddVqI3Fot9iuw9k8'
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone: '',
      type: '2'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required').min(3, 'Must be 4 characters or more'),
      username: Yup.string().required('Required').min(4, 'Must be 4 characters or more'),
      email: Yup.string()
        .required('Required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'),
      password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          'Password must be 7-19 characters and contain at least one letter, one number and a special character'
        ),
      password_confirmation: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Password must match'),
      phone: Yup.string()
        .required('Required')
        .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Must be a valid phone number'),
      type: Yup.number().required('Required')
    }),
    onSubmit: (values) => {
      // axios.post(`${process.env.REACT_APP_API_URL}/v1/operator/users?${values}`, { headers }).catch((err) => console.log(err));
      console.log(values);
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
          <DialogTitle>Add Customer</DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter Name*" onChange={formik.handleChange} />
                {formik.errors.name && <p className="errorMsg"> {formik.errors.name} </p>}
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter Username*" onChange={formik.handleChange} />
                {formik.errors.username && <p className="errorMsg"> {formik.errors.username} </p>}
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter Email*" onChange={formik.handleChange} />
                {formik.errors.email && <p className="errorMsg"> {formik.errors.email} </p>}
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter password*" onChange={formik.handleChange} />
                {formik.errors.password && <p className="errorMsg"> {formik.errors.password} </p>}
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter password_confirmation*" onChange={formik.handleChange} />
                {formik.errors.password_confirmation && <p className="errorMsg"> {formik.errors.password_confirmation} </p>}
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter phone*" onChange={formik.handleChange} />
                {formik.errors.phone && <p className="errorMsg"> {formik.errors.phone} </p>}
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter type*" onChange={formik.handleChange} />
                {formik.errors.type && <p className="errorMsg"> {formik.errors.type} </p>}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <AnimateButton>
              <Button variant="contained">Create</Button>
            </AnimateButton>
            <Button variant="text" color="error" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default AddAdministrator;
