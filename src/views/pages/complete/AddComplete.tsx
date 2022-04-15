// THIRD PARTY
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Divider, TextField, Grid, FormControl, FormHelperText, Dialog } from '@mui/material';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';

// PROJECT IMPORT
import RankSelect from 'components/Common/RankSelect';
import AnimateButton from 'ui-component/extended/AnimateButton';

const AddComplete = (props: any) => {
  const { dataEdit, visible } = props;
  const [visibleModal, setVisibleModal] = useState(false);
  const [checkFirst, setCheckFirst] = useState(true);
  const [data, setData] = useState(dataEdit);

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
  };

  const changeModal = (type: string) => {
    if (type === 'close') {
      setVisibleModal(false);
      setData({});
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
      phone: data?.phone,
      email: data?.email,
      rank: data?.rank
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
                <FormControl size="small" fullWidth>
                  <TextField
                    id="outlined-basic"
                    name="name"
                    value={formik.values?.name}
                    label={
                      <span>
                        <span style={{ color: 'red' }}>*</span> Tên ứng viên
                      </span>
                    }
                    fullWidth
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xl={12}>
              <Box sx={{ mb: 1 }}>
                <FormControl size="small" fullWidth>
                  <TextField
                    id="outlined-basic"
                    name="phone"
                    value={formik.values?.phone}
                    label={
                      <span>
                        <span style={{ color: 'red' }}>*</span> Số điện thoại
                      </span>
                    }
                    fullWidth
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xl={12}>
              <Box sx={{ mb: 1 }}>
                <FormControl size="small" fullWidth>
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xl={12}>
              <Box sx={{ mb: 1 }}>
                <FormControl fullWidth>
                  <RankSelect
                    size="medium"
                    blur={formik.handleBlur}
                    change={formik.handleChange}
                    values={formik.values?.rank}
                    required
                    formik={formik}
                  />
                  {formik.touched.rank && formik.errors.rank && (
                    <FormHelperText error id="standard-weight-helper-text-rank-login">
                      {formik.errors.rank}
                    </FormHelperText>
                  )}
                </FormControl>
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

export default AddComplete;
