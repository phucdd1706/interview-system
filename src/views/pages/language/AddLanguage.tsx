// THIRD PARTY
import React, { useState, useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  Button,
  Stack,
  DialogContent,
  Typography,
  Divider,
  TextField,
  Grid,
  Dialog,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

// PROJECT IMPORT
import AnimateButton from 'ui-component/extended/AnimateButton';
import { addLanguage, editLanguage } from 'store/slices/language';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';
import { SelectProps } from 'types/user';

const AddLanguage = (props: any) => {
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
    if (data.id) {
      dispatch(
        editLanguage({
          id: data.id,
          params: values,
          token,
          callback: (res) => {
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
              changeModal('close');
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
      delete values.status;
      dispatch(
        addLanguage({
          params: values,
          token,
          callback: (res) => {
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
              changeModal('close');
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
      formik.resetForm();
    } else {
      setVisibleModal(true);
    }
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(50)
      .required('Name is required')
      .matches(
        /^[A-Za-zĐÀÁẢẠÃẦẤẨẬẪÂẮẰẶẴĂẲÈÉẸẺẼỂẾỀỆỄÊỊÌÍĨỈÒÓỎỌÕÔỐỒỔỘỖỜỚỠỢỞƠÙÚỤỦŨỨỪỬỮỰƯÝỲỶỸỴđàáảạãầấẩậẫâắằặẵăẳèéẹẻẽểếềệễêịìíĩỉòóỏọõôốồổộỗờớỡợởơùúụủũứừửữựưýỳỷỹỵ]{1}[A-Za-z0-9ĐÀÁẢẠÃẦẤẨẬẪÂẮẰẶẴĂẲÈÉẸẺẼỂẾỀỆỄÊỊÌÍĨỈÒÓỎỌÕÔỐỒỔỘỖỜỚỠỢỞƠÙÚỤỦŨỨỪỬỮỰƯÝỲỶỸỴđàáảạãầấẩậẫâắằặẵăẳèéẹẻẽểếềệễêịìíĩỉòóỏọõôố ồổộỗờớỡợ/ởơùúụủũứừửữựưýỳỷỹỵ,-]{2,49}$$/i,
        'Please enter a name between 3 and 50 characters including letters and numbers'
      ),
    description: yup.string().max(255).required('Description is required'),
    status: yup.string().required('Status is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name,
      description: data?.description,
      status: data?.status || 1
    },
    validationSchema,
    onSubmit: (values) => {
      handleAdd(values);
    }
  });

  const Status: SelectProps[] = [
    {
      value: 0,
      label: 'Inactive'
    },
    {
      value: 1,
      label: 'Active'
    },
    {
      value: 2,
      label: 'Blocked'
    }
  ];

  return (
    <Dialog
      open={visibleModal}
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
                {data?.id ? `Edit ${data?.name}` : 'Add new language'}
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
                id="description"
                name="description"
                value={formik.values?.description}
                label={
                  <span>
                    <span style={{ color: 'red' }}>*</span> Description
                  </span>
                }
                fullWidth
                onChange={formik.handleChange}
                error={(formik.touched.description && Boolean(formik.errors.description)) || errors?.description}
                helperText={(formik.touched.description && formik.errors.description) || errors?.description}
              />
            </Grid>

            {data?.id && (
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
            )}

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
    </Dialog>
  );
};

export default AddLanguage;
