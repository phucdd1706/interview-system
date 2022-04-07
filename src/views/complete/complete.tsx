// THIRD-PARTY
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableRow,
  TableContainer,
  TableHead,
  Button,
  TablePagination,
  Box,
  TextField,
  Grid,
  FormControl,
  Popover,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import moment from 'moment';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { RootState } from 'store/index';
import { Candidates, SearchValues } from 'types/complete';
import { fetchCandidates, filter } from 'store/slices/complete';
import RankSelect from 'components/Common/RankSelect';
import CandidateModal from 'components/ModalPage/CandidateModal';
import CandidateDrawer from 'components/DrawerPage/CandidateDrawer';

const Complete = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('serviceToken');
  const complete = useSelector((state: RootState) => state.complete);

  const [candidate, setCandidate] = useState<Candidates[]>(complete.data.list);
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [idRecord, setIdRecord] = useState(0);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setCandidate(complete.data.list);
  }, [complete]);

  const getList = () => {
    const filterRedux = complete.filter;
    const params = filterRedux;

    dispatch(
      fetchCandidates({
        params,
        token
      })
    );
  };

  const handleSearch = (values: SearchValues) => {
    const queryName = {
      search: values?.search?.trim(),
      rank: values?.rank
    };
    if (!values.search) {
      delete queryName.search;
    }
    if (!values.rank) {
      delete queryName.rank;
    }
    const params = queryName;
    dispatch(filter(params));
    dispatch(
      fetchCandidates({
        params,
        token
      })
    );
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIdRecord(0);
  };

  const deleteRecord = () => {
    console.log('idRecord', idRecord);
    handleClose();
  };

  const renderSearchForm = () => {
    const filterRedux = complete.filter;
    return (
      <Formik
        initialValues={{
          search: '',
          rank: ''
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSearch(values);
          setSubmitting(false);
        }}
      >
        {({ handleBlur, handleChange, handleSubmit, isSubmitting, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={{ xl: 2, sx: 1 }}>
              <Grid item xl={4} xs={12}>
                <Box sx={{ mb: 2 }}>
                  <FormControl size="small" fullWidth>
                    <TextField
                      id="outlined-basic"
                      name="search"
                      value={values?.search}
                      label={<span>Tên ứng viên</span>}
                      fullWidth
                      size="small"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xl={4} xs={12}>
                <Box sx={{ mb: 2 }}>
                  <FormControl size="small" fullWidth>
                    <RankSelect blur={handleBlur} change={handleChange} values={values} />
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xl={4} xs={12}>
                <Box sx={{ mb: 2, position: 'relative' }}>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    variant="contained"
                    sx={{ position: 'absolute', right: 0 }}
                    type="submit"
                  >
                    Tìm kiếm
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    );
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <MainCard title={<span>Complete</span>}>
        {renderSearchForm()}
        <Box sx={{ mt: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell align="center">#</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidate?.map((row) => (
                  <TableRow key={row?.id}>
                    <TableCell component="th" scope="row">
                      {row?.name}
                    </TableCell>
                    <TableCell>{row?.phone}</TableCell>
                    <TableCell>{row?.email}</TableCell>
                    <TableCell>{moment().format('L')}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: 'inherit' }}
                        onClick={() => {
                          setDataEdit(row);
                          setVisibleModal(!visibleModal);
                        }}
                      >
                        Chi tiết
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: 'inherit', ml: 1 }}
                        onClick={() => {
                          setDataEdit(row);
                          setVisibleAdd(!visibleAdd);
                        }}
                      >
                        Sửa
                      </Button>
                      <span>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ textTransform: 'inherit', ml: 1 }}
                          onClick={(e) => {
                            handleClick(e);
                            setIdRecord(row.id);
                          }}
                          color="error"
                        >
                          Xóa
                        </Button>
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                          }}
                        >
                          <Typography sx={{ p: 1.5 }}>Bạn có chắc chắn muốn xóa?</Typography>
                          <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
                            <Button size="small" variant="outlined" onClick={handleClose}>
                              Hủy
                            </Button>
                            <Button size="small" color="error" variant="outlined" onClick={() => deleteRecord()}>
                              Xóa
                            </Button>
                          </Box>
                        </Popover>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={100}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </MainCard>
      <CandidateDrawer visible={visibleAdd} dataEdit={dataEdit} />
      <CandidateModal visible={visibleModal} dataEdit={dataEdit} />
    </>
  );
};

export default Complete;
