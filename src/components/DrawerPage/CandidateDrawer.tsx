// THIRD PARTY
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Divider,
  Container,
  TextField,
  Grid,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
  Drawer
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

// PROJECT IMPORT
import RankSelect from 'components/Common/RankSelect';

const CandidateDrawer = (props: any) => {
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
  return (
    <Drawer anchor="right" open={visibleModal} onClose={() => changeModal('close')}>
      <Box sx={{ width: 350, p: 2 }} role="presentation">
        <Typography id="modal-modal-title" variant="h4" component="h2">
          {data?.id ? 'Sửa thông tin ứng viên' : 'Thêm mới ứng viên'}
        </Typography>
        <Divider sx={{ mb: 3, mt: 1 }} />
        <Formik
          initialValues={{
            name: data?.name,
            phone: data?.phone,
            email: data?.email,
            rank: data?.rank
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            phone: Yup.string().max(10).required('Phone is required'),
            rank: Yup.string().required('Rank is required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleAdd(values);
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, values, touched }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xl={12}>
                  <Box sx={{ mb: 1 }}>
                    <FormControl size="small" fullWidth>
                      <TextField
                        id="outlined-basic"
                        name="name"
                        value={values?.name}
                        label={
                          <span>
                            <span style={{ color: 'red' }}>*</span> Tên ứng viên
                          </span>
                        }
                        fullWidth
                        size="small"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                      />
                      {touched.name && errors.name && (
                        <FormHelperText error id="standard-weight-helper-text-name-login">
                          {errors.name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xl={12}>
                  <Box sx={{ mb: 1 }}>
                    <FormControl size="small" fullWidth>
                      <TextField
                        id="outlined-basic"
                        name="phone"
                        value={values?.phone}
                        label={
                          <span>
                            <span style={{ color: 'red' }}>*</span> Số điện thoại
                          </span>
                        }
                        fullWidth
                        size="small"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                      />
                      {touched.phone && errors.phone && (
                        <FormHelperText error id="standard-weight-helper-text-phone-login">
                          {errors.phone}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xl={12}>
                  <Box sx={{ mb: 1 }}>
                    <FormControl size="small" fullWidth>
                      <TextField
                        id="outlined-basic"
                        name="email"
                        value={values?.email}
                        label={
                          <span>
                            <span style={{ color: 'red' }}>*</span> Email
                          </span>
                        }
                        fullWidth
                        size="small"
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xl={12}>
                  <Box sx={{ mb: 1 }}>
                    <FormControl size="small" fullWidth>
                      <RankSelect blur={handleBlur} change={handleChange} values={values} required />
                      {touched.rank && errors.rank && (
                        <FormHelperText error id="standard-weight-helper-text-rank-login">
                          {errors.rank}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xl={12}>
                  <Box sx={{ mb: 2, position: 'relative' }}>
                    <Button variant="contained" sx={{ position: 'absolute', right: 0 }} type="submit">
                      Lưu lại
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Drawer>
  );
};

export default CandidateDrawer;
