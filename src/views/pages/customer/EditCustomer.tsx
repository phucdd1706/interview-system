// THIRD-PARTY
import { forwardRef, SyntheticEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps, TextField } from '@mui/material';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface AddCustomerProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
}

const InfoCustomer = ({ open, handleCloseDialog }: AddCustomerProps) => {
  const theme = useTheme();

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
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter Name*" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter Username*" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter Email*" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter password*" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter password_confirmation*" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter phone*" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Enter type*" />
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

export default InfoCustomer;
