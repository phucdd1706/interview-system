// THIRD-PARTY
import { forwardRef, SyntheticEvent, useEffect } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps, TextField } from '@mui/material';

// PROJECT IMPORTS

import { gridSpacing } from 'store/constant';

import QLAdminService from 'contexts/admin';
import { dispatch, useSelector } from 'store';
import { Formik } from 'formik';
import { getDetailDepartment } from 'store/slices/department';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface InfoDepartmentProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
  id: string;
}

const InfoDepartment = ({ open, handleCloseDialog, id }: InfoDepartmentProps) => {
  const { department } = useSelector((state) => state.department);
  const DepartmentById = department.filter((item) => item.id === id);

  //   useEffect(() => {
  //     dispatch(getDetailDepartment(id));
  //   });
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
                <TextField id="name" fullWidth label="Department Name*" defaultValue={DepartmentById[0].name} />
              </Grid>
              <Grid item xs={12}>
                <TextField id="code" fullWidth label="Department Code*" defaultValue={DepartmentById[0].code} />
              </Grid>

              <Grid item xs={12}>
                <TextField id="status" fullWidth label="Enter Status*" defaultValue={DepartmentById[0].status} />
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

export default InfoDepartment;
