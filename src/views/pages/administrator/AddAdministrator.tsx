// THIRD-PARTY
import React, { forwardRef, SyntheticEvent } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, Slide, SlideProps, TextField } from '@mui/material';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';

import DatePicker from '@mui/lab/DatePicker';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface AddAdministratorProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
}

const AddAdministrator = ({ open, handleCloseDialog }: AddAdministratorProps) => {
  const [value, setValue] = React.useState<Date | null>(null);

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
          <DialogTitle>Add Administrator</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ marginTop: '5px' }}>
                <InputLabel style={{ color: 'black' }}>Name</InputLabel>
                <TextField name="name1" fullWidth autoFocus size="small" placeholder="Name" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>UserName</InputLabel>
                <TextField name="bod1" fullWidth autoFocus size="small" placeholder="UserName" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Gender</InputLabel>
                <TextField name="gender" fullWidth autoFocus size="small" placeholder="Gender" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Phone</InputLabel>
                <TextField name="phone" fullWidth autoFocus size="small" placeholder="Phone" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Email</InputLabel>
                <TextField name="email" fullWidth autoFocus size="small" placeholder="Email" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>PassWord</InputLabel>
                <TextField name="passWord" type="password" fullWidth autoFocus size="small" placeholder="PassWord" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Confirm PassWord</InputLabel>
                <TextField name="passConfirm" type="password" fullWidth autoFocus size="small" placeholder="Email" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Date of birth</InputLabel>
                {/* <DatePicker
                  label="date of birth"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                /> */}
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Due Date</InputLabel>
                <TextField name="duedate" fullWidth autoFocus size="small" placeholder="" />
              </Grid>
              <Grid item xs={12}>
                <InputLabel style={{ color: 'black' }}>Status</InputLabel>
                <TextField name="status" fullWidth autoFocus size="small" />
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
