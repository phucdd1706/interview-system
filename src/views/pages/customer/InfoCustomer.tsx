// THIRD-PARTY
import { forwardRef, SyntheticEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps, TextField } from '@mui/material';

// PROJECT IMPORTS
import { gridSpacing } from 'store/constant';
import { useSelector } from 'store';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface AddAdministratorProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
  id?: string;
}

const InfoCustomer = ({ open, handleCloseDialog, id }: AddAdministratorProps) => {
  const theme = useTheme();
  const { users } = useSelector((state) => state.customer);
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
          <DialogTitle>Info Customer</DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Name" value={userById[0].name} />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="User name" value={userById[0].username} />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Email" value={userById[0].email} />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Phone" value={userById[0].phone} />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic1" fullWidth label="Type" value={userById[0].type} />
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

export default InfoCustomer;
