// THIRD PARTY
import React, { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Button, Stack, DialogContent, Typography, Divider, TextField, Grid, FormHelperText, Dialog } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

// PROJECT IMPORT
import RankSelect from 'components/Common/RankSelect';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { addCandidate, editCandidate } from 'store/slices/inProgress';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';
import { Candidates } from 'types/inProgress';

interface Props {
  dataEdit: Candidates;
  visible: boolean;
  handleVisibleModal: () => void;
}

const AddInProgress = ({ dataEdit, visible, handleVisibleModal }: Props) => {
  const [errors, setErrors] = useState<any>({});

  const handleAdd = (values: Candidates) => {
    if (dataEdit.id) {
      dispatch(
        editCandidate({
          id: dataEdit.id,
          params: values,
          callback: (res) => {
            if (res?.data?.success) {
              openNotification('success', 'Edit record successfully!');
              changeModal('close');
            } else {
              openNotification('error', res?.message);
              setErrors(res?.errors);
            }
          }
        })
      );
    } else {
      dispatch(
        addCandidate({
          params: values,
          callback: (res) => {
            if (res?.data?.success) {
              openNotification('success', 'Add new record successfully!');
              changeModal('close');
            } else {
              openNotification('error', res?.message);
              setErrors(res?.errors);
            }
          }
        })
      );
    }
  };

  const openNotification = (color: string, message: string) => {
    dispatch(
      openSnackbar({
        open: true,
        message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color
        },
        close: true
      })
    );
  };

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleVisibleModal();
      setErrors({});
      formik.resetForm();
    }
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
    phone: yup.string().max(10).required('Phone is required'),
    rank_id: yup.string().required('Rank is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: dataEdit?.name,
      username: dataEdit?.username,
      email: dataEdit?.email,
      password: dataEdit?.password,
      password_confirmation: dataEdit?.password_confirmation,
      rank_id: dataEdit?.rank_id,
      phone: dataEdit?.phone,
      type: 1
    },
    validationSchema,
    onSubmit: (values) => {
      handleAdd(values);
    }
  });

  return (
    <Dialog
      open={visible}
      onClose={() => {
        changeModal('close');
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
      {visible && (
        <>
          <Box sx={{ p: 3 }}>
            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
              <Grid item sx={{ width: 'calc(100% - 50px)' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Button
                    variant="text"
                    color="error"
                    sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                    onClick={() => changeModal('close')}
                  >
                    <HighlightOffIcon />
                  </Button>
                  <Typography
                    variant="h4"
                    sx={{
                      display: 'inline-block',
                      width: 'calc(100% - 34px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      verticalAlign: 'middle'
                    }}
                  >
                    {dataEdit?.id ? 'Edit record' : 'Add new record'}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                <Grid item xl={12}>
                  <TextField
                    id="name"
                    name="name"
                    value={formik.values?.name}
                    label={
                      <span>
                        <span style={{ color: 'red' }}>*</span> Name
                      </span>
                    }
                    fullWidth
                    onChange={formik.handleChange}
                    error={(formik.touched.name && Boolean(formik.errors.name)) || errors?.name}
                    helperText={(formik.touched.name && formik.errors.name) || errors?.name}
                  />
                </Grid>
                <Grid item xl={12}>
                  <TextField
                    id="username"
                    name="username"
                    value={formik.values?.username}
                    label={
                      <span>
                        <span style={{ color: 'red' }}>*</span> Username
                      </span>
                    }
                    fullWidth
                    onChange={formik.handleChange}
                    error={(formik.touched.username && Boolean(formik.errors.username)) || errors?.username}
                    helperText={(formik.touched.username && formik.errors.username) || errors?.username}
                  />
                </Grid>
                <Grid item xl={12}>
                  <TextField
                    id="phone"
                    name="phone"
                    value={formik.values?.phone}
                    label={
                      <span>
                        <span style={{ color: 'red' }}>*</span> Phone
                      </span>
                    }
                    fullWidth
                    onChange={formik.handleChange}
                    error={(formik.touched.phone && Boolean(formik.errors.phone)) || errors?.phone}
                    helperText={(formik.touched.phone && formik.errors.phone) || errors?.phone}
                  />
                </Grid>
                <Grid item xl={12}>
                  <TextField
                    id="email"
                    name="email"
                    value={formik.values?.email}
                    label={
                      <span>
                        <span style={{ color: 'red' }}>*</span> Email
                      </span>
                    }
                    fullWidth
                    onChange={formik.handleChange}
                    error={(formik.touched.email && Boolean(formik.errors.email)) || errors?.email}
                    helperText={(formik.touched.email && formik.errors.email) || errors?.email}
                  />
                </Grid>
                {!dataEdit?.id && (
                  <>
                    <Grid item xl={12}>
                      <TextField
                        id="password"
                        name="password"
                        value={formik.values?.password}
                        label={
                          <span>
                            <span style={{ color: 'red' }}>*</span> Password
                          </span>
                        }
                        fullWidth
                        onChange={formik.handleChange}
                        error={(formik.touched.password && Boolean(formik.errors.password)) || errors?.password}
                        helperText={(formik.touched.password && formik.errors.password) || errors?.password}
                      />
                    </Grid>
                    <Grid item xl={12}>
                      <TextField
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formik.values?.password_confirmation}
                        label={
                          <span>
                            <span style={{ color: 'red' }}>*</span> Confirm password
                          </span>
                        }
                        fullWidth
                        onChange={formik.handleChange}
                        error={(formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)) || errors?.password}
                        helperText={(formik.touched.password_confirmation && formik.errors.password_confirmation) || errors?.password}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xl={12}>
                  <RankSelect fullWidth size="medium" change={formik.handleChange} values={formik.values?.rank_id} formik={formik} />
                  {formik.touched.rank_id && formik.errors.rank_id && (
                    <FormHelperText error id="standard-weight-helper-text-rank-login">
                      {formik.errors.rank_id}
                    </FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <AnimateButton>
                    <Button fullWidth variant="contained" type="submit">
                      Save
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </DialogContent>
          </form>
        </>
      )}
    </Dialog>
  );
};

export default AddInProgress;
