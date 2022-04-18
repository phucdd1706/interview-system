// THIRD PARTY
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Divider, TextField, Grid, FormHelperText, Dialog } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

// PROJECT IMPORT
import RankSelect from 'components/Common/RankSelect';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { addCandidate, editCandidate } from 'store/slices/inProgress';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

const AddInProgress = (props: any) => {
  const { dataEdit, visible } = props;
  const token = localStorage.getItem('serviceToken');
  const [visibleModal, setVisibleModal] = useState(false);
  const [checkFirst, setCheckFirst] = useState(true);
  const [data, setData] = useState(dataEdit);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (!visible && checkFirst) {
      setCheckFirst(false);
    } else {
      changeModal('show');
      if (dataEdit?.id) {
        setData(dataEdit);
      }
    }
  }, [visible]);

  const handleAdd = (values: any) => {
    console.log('values', values);
    if (data.id) {
      dispatch(
        editCandidate({
          id: data.id,
          params: values,
          token,
          callback: (res) => {
            console.log('res', res);
            if (res?.data?.success) {
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Edit record successfully!',
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: true
                })
              );
              setVisibleModal(false);
            } else {
              dispatch(
                openSnackbar({
                  open: true,
                  message: res?.message,
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  variant: 'alert',
                  alert: {
                    color: 'error'
                  },
                  close: true
                })
              );
              setErrors(res?.errors);
            }
          }
        })
      );
    } else {
      dispatch(
        addCandidate({
          params: values,
          token,
          callback: (res) => {
            console.log('res', res);
            if (res?.data?.success) {
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Add new record successfully!',
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: true
                })
              );
              setVisibleModal(false);
            } else {
              dispatch(
                openSnackbar({
                  open: true,
                  message: res?.message,
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  variant: 'alert',
                  alert: {
                    color: 'error'
                  },
                  close: true
                })
              );
              setErrors(res?.errors);
            }
          }
        })
      );
    }
  };

  const changeModal = (type: string) => {
    if (type === 'close') {
      setVisibleModal(false);
      setData({});
      setErrors({});
    } else {
      setVisibleModal(true);
    }
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
    phone: yup.string().max(10).required('Phone is required'),
    rank: yup.string().required('Rank is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name,
      username: data?.username,
      email: data?.email,
      password: data?.password,
      password_confirmation: data?.password_confirmation,
      rank: data?.rank,
      phone: data?.phone,
      type: 1
    },
    validationSchema,
    onSubmit: (values) => {
      handleAdd(values);
    }
  });

  return (
    <Dialog
      open={visibleModal}
      onClose={() => {
        changeModal('close');
        formik.resetForm();
      }}
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
      <Box sx={{ p: 3 }} role="presentation">
        <Typography id="modal-modal-title" variant="h4" component="h2">
          {data?.id ? 'Edit record' : 'Add new record'}
        </Typography>
        <Divider sx={{ mb: 3, mt: 1 }} />
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xl={12}>
              <Box sx={{ mb: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="name"
                  value={formik.values?.name}
                  label={
                    <span>
                      <span style={{ color: 'red' }}>*</span> Name
                    </span>
                  }
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Box>
            </Grid>
            <Grid item xl={12}>
              <Box sx={{ mb: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="username"
                  value={formik.values?.username}
                  label={
                    <span>
                      <span style={{ color: 'red' }}>*</span> Username
                    </span>
                  }
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={(formik.touched.username && Boolean(formik.errors.username)) || errors?.username}
                  helperText={(formik.touched.username && formik.errors.username) || errors?.username}
                />
              </Box>
            </Grid>
            <Grid item xl={12}>
              <Box sx={{ mb: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="phone"
                  value={formik.values?.phone}
                  label={
                    <span>
                      <span style={{ color: 'red' }}>*</span> Phone
                    </span>
                  }
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={(formik.touched.phone && Boolean(formik.errors.phone)) || errors?.phone}
                  helperText={(formik.touched.phone && formik.errors.phone) || errors?.phone}
                />
              </Box>
            </Grid>
            <Grid item xl={12}>
              <Box sx={{ mb: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="email"
                  value={formik.values?.email}
                  label={
                    <span>
                      <span style={{ color: 'red' }}>*</span> Email
                    </span>
                  }
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={(formik.touched.email && Boolean(formik.errors.email)) || errors?.email}
                  helperText={(formik.touched.email && formik.errors.email) || errors?.email}
                />
              </Box>
            </Grid>
            <Grid item xl={12}>
              <Box sx={{ mb: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="password"
                  value={formik.values?.password}
                  label={
                    <span>
                      <span style={{ color: 'red' }}>*</span> Password
                    </span>
                  }
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={(formik.touched.password && Boolean(formik.errors.password)) || errors?.password}
                  helperText={(formik.touched.password && formik.errors.password) || errors?.password}
                />
              </Box>
            </Grid>
            <Grid item xl={12}>
              <Box sx={{ mb: 1 }}>
                <TextField
                  id="outlined-basic"
                  name="password_confirmation"
                  value={formik.values?.password_confirmation}
                  label={
                    <span>
                      <span style={{ color: 'red' }}>*</span> Confirm password
                    </span>
                  }
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={(formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)) || errors?.password}
                  helperText={(formik.touched.password_confirmation && formik.errors.password_confirmation) || errors?.password}
                />
              </Box>
            </Grid>
            <Grid item xl={12}>
              <Box sx={{ mb: 1 }}>
                <RankSelect fullWidth size="medium" change={formik.handleChange} values={formik.values?.rank} required formik={formik} />
                {formik.touched.rank && formik.errors.rank && (
                  <FormHelperText error id="standard-weight-helper-text-rank-login">
                    {formik.errors.rank}
                  </FormHelperText>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <AnimateButton>
                <Button fullWidth variant="contained" type="submit">
                  Save
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Dialog>
  );
};

export default AddInProgress;
