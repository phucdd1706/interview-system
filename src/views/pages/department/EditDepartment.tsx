// THIRD-PARTY
import { forwardRef, SyntheticEvent } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps, TextField } from '@mui/material';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
// import { useDispatch } from 'store';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { putDepartment } from 'store/slices/department';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface EditDepartmentProps {
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
const EditDepartment = ({ open, handleCloseDialog, id }: EditDepartmentProps) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      note: ''
    },
    validationSchema,
    onSubmit: (values) => {
      if (id) {
        dispatch(putDepartment(id, values));
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
          <DialogTitle>Edit Department</DialogTitle>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Department Name*"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="code" fullWidth label="Department Code*" onChange={formik.handleChange} value={formik.values.code} />
                </Grid>

                <Grid item xs={12}>
                  <TextField id="note" fullWidth label="Enter note*" onChange={formik.handleChange} value={formik.values.note} />
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

export default EditDepartment;
