// THIRD-PARTY
import React, { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

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

import { Department, DepartmentFilter, SelectProps } from 'types/department';
import { postDepartment, getDepartmentList, putDepartment } from 'store/slices/department';

interface AddDepartmentProps {
  open: boolean;
  departFilter: DepartmentFilter;
  department: Department;
  edit?: boolean;
  handleDrawerOpen: () => void;
}

const Status: SelectProps[] = [
  {
    value: 0,
    label: 'Inactive'
  },
  {
    value: 1,
    label: 'Active'
  }
];

const validationSchema = Yup.object({
  name: Yup.string().trim().max(50).required('Name is required'),
  code: Yup.string().trim().max(255).required('Code is required')
});

const AddDepartment = ({ open, edit, handleDrawerOpen, departFilter, department }: AddDepartmentProps) => {
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
    if (department?.id) {
      dispatch(
        putDepartment({
          id: department.id,
          params: values,
          callback: (resp) => {
            if (resp?.data?.success) {
              Notification('success', 'Edit department successfully!');
              changeModal('close');
            } else {
              Notification('error', resp?.errors.name || resp?.errors.code);
              setErrors(resp?.errors);
            }
          }
        })
      );
    } else {
      dispatch(
        postDepartment({
          params: values,
          callback: (resp) => {
            if (resp?.data?.success) {
              dispatch(getDepartmentList(departFilter));
              Notification('success', 'Add new record successfully!');
              changeModal('close');
            } else {
              Notification('error', resp?.errors.name || resp?.errors.code);
              setErrors(resp?.errors);
            }
          }
        })
      );
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: department?.name,
      code: department?.code,
      status: department?.id ? department?.status : 1
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
                    {department?.id ? `${edit ? 'Edit' : 'Department'} "${department?.name}"` : 'Add New Department'}
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
                      inputProps={{ readOnly: !edit }}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
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
                      inputProps={{ readOnly: !edit }}
                      error={formik.touched.code && Boolean(formik.errors.code)}
                      helperText={formik.touched.code && formik.errors.code}
                    />
                  </Grid>
                  {department.id && (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          id="status"
                          name="status"
                          label="Status"
                          displayEmpty
                          value={formik?.values?.status}
                          onChange={formik.handleChange}
                          readOnly={!edit}
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          {Status.map((status: SelectProps, index: number) => (
                            <MenuItem key={index} value={status.value}>
                              {status.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                  {edit && (
                    <Grid item xs={12}>
                      <AnimateButton>
                        <Button fullWidth variant="contained" type="submit">
                          Save
                        </Button>
                      </AnimateButton>
                    </Grid>
                  )}
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
