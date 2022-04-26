// THIRD-PARTY

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
// import { useDispatch } from 'store';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { openSnackbar } from 'store/slices/snackbar';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { dispatch } from 'store';
import { Department, SelectProps } from 'types/department';
import { putDepartment } from 'store/slices/department';
import { useState } from 'react';

// const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface EditDepartmentProps {
  department: Department;
  open: boolean;
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
  name: Yup.string().required('Name is required'),
  code: Yup.string().required('Code is required'),
  status: Yup.string().required('Status is required')
});

const EditDepartment = ({ department, open, handleDrawerOpen }: EditDepartmentProps) => {
  const [errors, setErrors] = useState<any>({});

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      setErrors({});
      formik.resetForm();
    }
  };

  const EditDepart = (values: Department) => {
    dispatch(
      putDepartment({
        id: values.id,
        params: values,
        callback: (resp) => {
          if (resp?.data?.success) {
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
            changeModal('close');
          } else {
            dispatch(
              openSnackbar({
                open: true,
                message: resp?.message,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                  color: 'error'
                },
                close: true
              })
            );
            setErrors(resp?.errors);
          }
        }
      })
    );
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: department.id,
      name: department.name,
      code: department.code,
      status: department.status
    },
    validationSchema,
    onSubmit: (values) => {
      EditDepart(values);
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
              <Grid item sx={{ width: 'calc(100% - 50px)' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Button
                    variant="text"
                    color="error"
                    sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                    onClick={handleDrawerOpen}
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
                    {`Edit "${department.name}"`}
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
                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={(formik.touched.name && Boolean(formik.errors.name)) || errors.name}
                      helperText={(formik.touched.name && formik.errors.name) || errors.name}
                      fullWidth
                      label="Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="code"
                      name="code"
                      fullWidth
                      label="Code"
                      onChange={formik.handleChange}
                      value={formik.values.code}
                      error={(formik.touched.code && Boolean(formik.errors.code)) || errors.code}
                      helperText={(formik.touched.code && formik.errors.code) || errors.code}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Select
                        id="status"
                        name="status"
                        displayEmpty
                        value={formik.values.status}
                        onChange={formik.handleChange}
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

export default EditDepartment;
