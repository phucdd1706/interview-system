// THIRD PARTY
import React, { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Button, Stack, DialogContent, Typography, Divider, TextField, Grid, Dialog } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// PROJECT IMPORT
import AnimateButton from 'ui-component/extended/AnimateButton';
import { addCandidate, editCandidate } from 'store/slices/history';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';
import { Candidates } from 'types/history';

interface Props {
  dataEdit: Candidates;
  visible: boolean;
  handleVisibleModal: () => void;
  getList: () => void;
}

const AddHistory = ({ dataEdit, visible, handleVisibleModal, getList }: Props) => {
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
              getList();
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

  const validationSchema = yup.object().shape({
    name: yup.string().max(100).required('Name is required'),
    email: yup.string().email('Must be a valid email').max(100).required('Email is required'),
    age: yup
      .string()
      .matches(/^[0-9]{1,2}$/i, 'Age can only enter numbers and less 100')
      .required('Age is required'),
    time: yup.string().max(256).required('Time is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: dataEdit?.name,
      email: dataEdit?.email,
      age: dataEdit?.age,
      note: dataEdit?.note,
      time: dataEdit?.time,
      status: dataEdit?.id ? dataEdit.status : 0
    },
    validationSchema,
    onSubmit: (values) => {
      handleAdd(values);
    }
  });

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleVisibleModal();
      setErrors({});
      formik.resetForm();
    }
  };

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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={12} xl={12}>
                    <TextField
                      id="name"
                      name="name"
                      value={formik.values?.name}
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Name
                        </span>
                      }
                      fullWidth
                      onChange={formik.handleChange}
                      error={(formik.touched.name && Boolean(formik.errors.name)) || errors?.name}
                      helperText={(formik.touched.name && formik.errors.name) || errors?.name}
                    />
                  </Grid>

                  <Grid item xs={12} xl={12}>
                    <TextField
                      id="email"
                      name="email"
                      value={formik.values?.email}
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Email
                        </span>
                      }
                      fullWidth
                      onChange={formik.handleChange}
                      error={(formik.touched.email && Boolean(formik.errors.email)) || errors?.email}
                      helperText={(formik.touched.email && formik.errors.email) || errors?.email}
                    />
                  </Grid>

                  <Grid item xs={12} xl={12}>
                    <TextField
                      id="age"
                      name="age"
                      value={formik.values?.age}
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Age
                        </span>
                      }
                      fullWidth
                      onChange={formik.handleChange}
                      error={(formik.touched.age && Boolean(formik.errors.age)) || errors?.age}
                      helperText={(formik.touched.age && formik.errors.age) || errors?.age}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <DesktopDatePicker
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Interview Time
                        </span>
                      }
                      value={formik.values.time}
                      inputFormat="dd/MM/yyyy"
                      onChange={(time) => {
                        formik.setFieldValue('time', time);
                      }}
                      renderInput={(props) => <TextField fullWidth {...props} />}
                    />
                  </Grid>

                  <Grid item xs={12} xl={12}>
                    <TextField
                      id="note"
                      name="note"
                      value={formik.values?.note}
                      label={<span>Note</span>}
                      fullWidth
                      onChange={formik.handleChange}
                      error={(formik.touched.note && Boolean(formik.errors.note)) || errors?.note}
                      helperText={(formik.touched.note && formik.errors.note) || errors?.note}
                    />
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
            </LocalizationProvider>
          </form>
        </>
      )}
    </Dialog>
  );
};

export default AddHistory;
