// THIRD-PARTY
import { forwardRef, SyntheticEvent, useEffect } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps, TextField } from '@mui/material';

// PROJECT IMPORTS

import { gridSpacing } from 'store/constant';

import { getDetailAdministrator } from 'store/slices/user';

import { useDispatch } from 'react-redux';
import QLAdminService from 'contexts/admin';
import { dispatch } from 'store';
import { Formik } from 'formik';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface InfoAdminProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
  id: string;
}

const InfoAdmin = ({ open, handleCloseDialog, id }: InfoAdminProps) => {
  // const { users } = useSelector((state) => state.user);
  // const userById = users.filter((item) => item.id === id);
  // const dispatch = useDispatch();
  const getDetailAdmin = async () => {
    if (id) {
      try {
        const resp = await QLAdminService.getDetailAdmin(id);
        // form.setFieldsValue(resp?.data?.success?.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getDetailAdmin();
    dispatch(getDetailAdministrator(id));
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
          <DialogTitle>Infomation Admin</DialogTitle>

          <DialogContent>
            <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
              <Grid item xs={12}>
                <TextField id="name" fullWidth label="Enter Name*" name="name" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="username" fullWidth label="Enter Username*" name="username" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="email" fullWidth label="Enter Email*" />
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
            <Button variant="text" color="error" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default InfoAdmin;
