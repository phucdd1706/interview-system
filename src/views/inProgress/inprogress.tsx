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
  Typography,
  Chip,
  IconButton,
  Fab,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { Formik } from 'formik';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { RootState } from 'store/index';
import { Candidates, SearchValues } from 'types/complete';
import { fetchCandidates, filter } from 'store/slices/inProgress';
import RankSelect from 'components/Common/RankSelect';
import CandidateDrawer from 'components/DrawerPage/CandidateDrawer';
import CandidateModal from 'components/ModalPage/CandidateModal';

const InProgress = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const token = localStorage.getItem('serviceToken');
  const inProgress = useSelector((state: RootState) => state.inProgress);

  const [candidate, setCandidate] = useState<Candidates[]>(inProgress.data.list);
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [idRecord, setIdRecord] = useState(0);
  const [loading, setLoading] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setCandidate(inProgress.data.list);
  }, [inProgress.data.list]);

  const getList = () => {
    const params = {};

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

  const renderSearchForm = () => (
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
          <Grid container spacing={{ xl: 2, xs: 1 }}>
            <Grid item xl={4} xs={12}>
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
            </Grid>
            <Grid item xl={4} xs={12}>
              <FormControl size="small" fullWidth>
                <RankSelect blur={handleBlur} change={handleChange} values={values} />
              </FormControl>
            </Grid>
            <Grid item xl={4} xs={12}>
              <Box sx={{ position: 'relative' }}>
                <Button disableElevation disabled={isSubmitting} variant="contained" type="submit">
                  Search
                </Button>
                <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
                  <Tooltip title="Add">
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => {
                        setVisibleAdd(!visibleAdd);
                        setDataEdit({});
                      }}
                      sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                    >
                      <AddIcon fontSize="small" />
                    </Fab>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <MainCard title={renderSearchForm()}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
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
                  <TableCell>{moment(row.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
                  <TableCell>
                    {row.status === 1 && (
                      <Chip
                        label="Inactive"
                        size="small"
                        sx={{
                          background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                          color: theme.palette.warning.dark
                        }}
                      />
                    )}
                    {row.status === 2 && (
                      <Chip
                        label="Active"
                        size="small"
                        sx={{
                          background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
                          color: theme.palette.success.dark
                        }}
                      />
                    )}
                    {row.status === 3 && (
                      <Chip
                        label="Blocked"
                        size="small"
                        sx={{
                          background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light + 80,
                          color: theme.palette.orange.dark
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    <IconButton
                      color="primary"
                      size="large"
                      onClick={() => {
                        setDataEdit(row);
                        setVisibleModal(!visibleModal);
                      }}
                    >
                      <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      size="large"
                      onClick={() => {
                        setDataEdit(row);
                        setVisibleAdd(!visibleAdd);
                      }}
                    >
                      <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </IconButton>
                    <span>
                      <IconButton
                        color="error"
                        size="large"
                        onClick={(e) => {
                          handleClick(e);
                          setIdRecord(row.id);
                        }}
                      >
                        <DeleteTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                      </IconButton>
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
      </MainCard>
      <CandidateDrawer visible={visibleAdd} dataEdit={dataEdit} />
      <CandidateModal visible={visibleModal} dataEdit={dataEdit} />
    </>
  );
};

export default InProgress;
