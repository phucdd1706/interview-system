// THIRD-PARTY
import React, { useState } from 'react';

import { Box, Button, Dialog, DialogContent, Divider, Grid, Stack, TextField, Typography } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AnimateButton from 'ui-component/extended/AnimateButton';

import * as Yup from 'yup';
import { useFormik } from 'formik';

// PROJECT IMPORTS
import { dispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';

import { Department, DepartmentFilter } from 'types/department';
import { postDepartment, getDepartmentList } from 'store/slices/department';

interface AddDepartmentProps {
  open: boolean;
  depart: DepartmentFilter;
  handleDrawerOpen: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().max(255, 'Maximum 255 characters').required('Name is required'),
  code: Yup.string().max(255, 'Maximum 255 characters').required('Code is required')
});

const AddDepartment = ({ open, handleDrawerOpen, depart }: AddDepartmentProps) => {
  const [errors, setErrors] = useState<any>({});

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      setErrors({});
      formik.resetForm();
    }
  };

  const Notification = (color: string, message: string) => {
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

  const AddDepart = (values: Department) => {
    dispatch(
      postDepartment({
        params: values,
        callback: (resp) => {
          if (resp?.data?.success) {
            dispatch(getDepartmentList(depart));
            Notification('success', 'Add new record successfully!');
            changeModal('close');
          } else {
            Notification('error', resp?.message);
            setErrors(resp?.errors);
          }
        }
      })
    );
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      code: ''
    },
    validationSchema,
    onSubmit: (values) => {
      AddDepart(values);
    }
  });
  return (
    <Dialog
      open={open}
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
      {open && (
        <>
          <Box sx={{ p: 3 }}>
            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
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
                    Add Department
                  </Typography>{' '}
                  <Button
                    variant="text"
                    color="error"
                    sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                    onClick={handleDrawerOpen}
                  >
                    <HighlightOffIcon />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={(formik.touched.name && Boolean(formik.errors.name)) || errors?.name}
                      helperText={(formik.touched.name && formik.errors.name) || errors?.name}
                      fullWidth
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Name
                        </span>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="code"
                      name="code"
                      fullWidth
                      label={
                        <span>
                          <span style={{ color: '#f44336' }}>*</span> Code
                        </span>
                      }
                      onChange={formik.handleChange}
                      value={formik.values.code}
                      error={(formik.touched.code && Boolean(formik.errors.code)) || errors?.code}
                      helperText={(formik.touched.code && formik.errors.code) || errors?.code}
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

export default AddDepartment;
