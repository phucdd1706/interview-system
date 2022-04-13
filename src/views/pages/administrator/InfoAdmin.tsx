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

const InfoAdmin = ({ open, handleCloseDialog, id }: InfoAdminProps) => {
  const { users } = useSelector((state) => state.user);
  const userById = users.filter((item) => item.id === id);

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
                <TextField id="name1" fullWidth label="Enter Name*" defaultValue={userById[0].name} disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField id="username1" fullWidth label="Enter Username*" defaultValue={userById[0].username} disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField id="email1" fullWidth label="Enter Email*" defaultValue={userById[0].email} disabled />
              </Grid>

              <Grid item xs={12}>
                <TextField id="phone1" fullWidth label="Enter phone*" defaultValue={userById[0].phone} disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField id="typ1e" fullWidth label="Enter type*" defaultValue={userById[0].type} disabled />
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
