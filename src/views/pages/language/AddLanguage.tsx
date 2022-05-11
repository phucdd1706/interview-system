// THIRD PARTY
import React, { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  Button,
  Stack,
  DialogContent,
  Typography,
  Divider,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Grid,
  InputLabel,
  Dialog,
  useMediaQuery
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTheme } from '@mui/material/styles';

// PROJECT IMPORT
import AnimateButton from 'ui-component/extended/AnimateButton';
import { addLanguage, editLanguage } from 'store/slices/language';
import { Languages } from 'types/language';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';
import { SelectProps } from 'types/customer';

interface Props {
  dataEdit: Languages;
  visible: boolean;
  edit: boolean;
  handleVisibleModal: () => void;
  getList: () => void;
}

const AddInProgress = ({ dataEdit, visible, edit, handleVisibleModal, getList }: Props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [errors, setErrors] = useState<any>({});
  const handleAdd = (values: Languages) => {
    if (dataEdit.id) {
      dispatch(
        editLanguage({
          id: dataEdit.id,
          params: values,
          callback: (res) => {
            if (res?.data?.success) {
              openNotification('success', 'Edit language successfully!');
              changeModal('close');
            } else {
              openNotification('error', res?.errors.name);
              setErrors(res?.errors);
            }
          }
        })
      );
    } else {
      dispatch(
        addLanguage({
          params: values,
          callback: (res) => {
            if (res?.data?.success) {
              getList();
              openNotification('success', 'Add language successfully!');
              changeModal('close');
            } else {
              openNotification('error', res?.errors.name);
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
      setErrors({});
      handleVisibleModal();
      formik.resetForm();
    }
  };

  const validationSchema = yup.object().shape({
    name: yup.string().trim().max(50).required('Name is required'),
    description: yup.string().trim().max(255).required('Description is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: dataEdit?.name,
      description: dataEdit?.description,
      status: dataEdit?.id ? dataEdit?.status : 1
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
    }
  ];

  return (
    <Dialog
      open={visible}
      onClose={() => {
        changeModal('close');
      }}
      fullScreen={matchDownSM}
      sx={{
        '&>div:nth-of-type(3)': {
          '&>div': {
            m: 0,
            borderRadius: '0px',
            width: matchDownSM ? '100%' : 850,
            maxHeight: '100%'
          }
        }
      }}
    >
      {visible && (
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
                    {dataEdit?.id ? `${edit ? 'Edit' : 'Language'} "${dataEdit?.name}"` : 'Add New Language'}
                  </Typography>
                  <Button
                    variant="text"
                    color="error"
                    sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                    onClick={() => changeModal('close')}
                  >
                    <HighlightOffIcon />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                <Grid item xs={12} xl={12}>
                  <TextField
                    id="name"
                    name="name"
                    inputProps={{ readOnly: !edit }}
                    value={formik?.values?.name}
                    label={
                      <span>
                        <span style={{ color: '#f44336' }}>*</span> Name
                      </span>
                    }
                    fullWidth
                    onChange={formik.handleChange}
                    error={formik?.touched?.name && Boolean(formik?.errors?.name)}
                    helperText={formik?.touched?.name && formik?.errors?.name}
                  />
                </Grid>
                <Grid item xs={12} xl={12}>
                  <TextField
                    id="description"
                    name="description"
                    inputProps={{ readOnly: !edit }}
                    value={formik?.values?.description}
                    label={
                      <span>
                        <span style={{ color: '#f44336' }}>*</span> Description
                      </span>
                    }
                    fullWidth
                    onChange={formik.handleChange}
                    error={(formik?.touched?.description && Boolean(formik?.errors?.description)) || errors?.description}
                    helperText={(formik?.touched?.description && formik?.errors?.description) || errors?.description}
                  />
                </Grid>
                {dataEdit.id && (
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
          </form>
        </>
      )}
    </Dialog>
  );
};

export default AddInProgress;
