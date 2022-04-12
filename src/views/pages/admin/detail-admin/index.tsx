import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid, InputLabel, PropTypes, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

interface PropTypes {
  dialog: boolean;
  setDialog: React.Dispatch<React.SetStateAction<boolean>>;

  // id: string | null | undefined;
}
const DetailAdmin = (props: PropTypes) => {
  const { dialog, setDialog } = props;

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };
  return (
    <>
      <Dialog open={dialog} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Chi Tiết Admin</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={24} sm={24}>
              <InputLabel style={{ color: 'black' }}>Tên quản lý</InputLabel>
              <TextField name="name1" fullWidth autoFocus size="small" />
            </Grid>
            <Grid item xs={24} sm={24}>
              <InputLabel style={{ color: 'black' }}>Phòng ban quản lý</InputLabel>
              <TextField name="bod1" fullWidth autoFocus size="small" />
            </Grid>
            <Grid item xs={24} sm={24}>
              <InputLabel style={{ color: 'black' }}>Trạng thái</InputLabel>
              <TextField name="status1" fullWidth autoFocus size="small" />
            </Grid>
            <Grid item xs={24} sm={24}>
              <InputLabel style={{ color: 'black' }}>Email</InputLabel>
              <TextField name="email" fullWidth autoFocus size="small" />
            </Grid>
            <Grid item xs={24} sm={24}>
              <InputLabel style={{ color: 'black' }}>Phone</InputLabel>
              <TextField name="phone" fullWidth autoFocus size="small" />
            </Grid>
            <Grid item xs={24} sm={24}>
              <InputLabel style={{ color: 'black' }}>Giới tính</InputLabel>
              <TextField name="gender" fullWidth autoFocus size="small" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            startIcon={<DeleteIcon className="mr-1 mb-1" />}
            style={{ backgroundColor: 'gray' }}
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button variant="contained" size="small" startIcon={<SaveIcon className="mr-1 mb-1" />} onClick={handleClose} autoFocus>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailAdmin;
