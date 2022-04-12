// THIRD-PARTY
import { forwardRef, SyntheticEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, Slide, SlideProps, TextField } from '@mui/material';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface AddDepartmentProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
}

const AddDepartment = ({ open, handleCloseDialog }: AddDepartmentProps) => {
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
          <DialogTitle>Add Department</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Department Name</InputLabel>
                <TextField name="name1" fullWidth autoFocus size="small" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Department code</InputLabel>
                <TextField name="bod1" fullWidth autoFocus size="small" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Management</InputLabel>
                <TextField name="status1" fullWidth autoFocus size="small" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Status</InputLabel>
                <TextField name="email" fullWidth autoFocus size="small" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Create At</InputLabel>
                <TextField name="phone" fullWidth autoFocus size="small" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Note</InputLabel>
                <TextField name="gender" fullWidth autoFocus size="small" />
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

export default AddDepartment;
