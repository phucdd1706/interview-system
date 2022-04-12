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
  Pagination,
  Box,
  TextField,
  Grid,
  FormControl,
  Popover,
  Typography,
  Chip,
  IconButton,
  Fab,
  Tooltip,
  Menu,
  MenuItem,
  Stack,
  useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { Formik } from 'formik';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { RootState } from 'store/index';
import { Candidates, SearchValues } from 'types/complete';
import { fetchCandidates, filter } from 'store/slices/inProgress';
import RankSelect from 'components/Common/RankSelect';
import CandidateDrawer from 'components/DrawerPage/CandidateDrawer';
import CandidateModal from 'components/ModalPage/CandidateModal';
import { gridSpacing } from '../../store/constant';
import SortStatus from 'views/inProgress/SortStatus';

const InProgress = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const spacingMD = matchDownMD ? 1 : 1.5;

  const token = localStorage.getItem('serviceToken');
  const inProgress = useSelector((state: RootState) => state.inProgress);

  const [candidate, setCandidate] = useState<Candidates[]>(inProgress.data.list);
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [idRecord, setIdRecord] = useState(0);
  const [loading, setLoading] = useState(false);
  const [anchorElSoft, setAnchorElSoft] = useState(null);
  const initialState: SearchValues = {
    search: '',
    rank: '',
    status: ''
  };
  const [filters, setFilters] = useState(initialState);

  const open = Boolean(anchorEl);
  const openSort = Boolean(anchorElSoft);

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

  const handleSort = (event: any) => {
    setAnchorElSoft(event.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorElSoft(null);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: string | '') => {
    setFilters({ ...filters, status: index });
    setAnchorElSoft(null);
  };

  const renderSearchForm = () => {
    const sortLabel = SortStatus.filter((items) => items.value === filters.status);

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
            <Grid container spacing={{ xl: 2, xs: 1 }}>
              <Grid item xl={10} xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={matchDownSM ? 0.5 : spacingMD}>
                  <FormControl size="small" sx={{ width: { xl: 236, md: 'auto', xs: 140 } }}>
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

                  <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>
                    |
                  </Typography>

                  <FormControl size="small" sx={{ width: { xl: 236, md: 'auto', xs: 140 } }}>
                    <RankSelect blur={handleBlur} change={handleChange} values={values} />
                  </FormControl>

                  <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>
                    |
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Typography variant="h5">Sort by: </Typography>
                    <Button
                      id="demo-positioned-button"
                      aria-controls="demo-positioned-menu"
                      aria-haspopup="true"
                      aria-expanded={openSort ? 'true' : undefined}
                      onClick={handleSort}
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {sortLabel.length > 0 && sortLabel[0].label}
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorElSoft}
                      open={openSort}
                      onClose={handleCloseSort}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      {SortStatus.map((status, index) => (
                        <MenuItem
                          sx={{ p: 1.5 }}
                          key={index}
                          selected={status.value === filters.status}
                          onClick={(event) => handleMenuItemClick(event, status.value || '')}
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xl={2} xs={12}>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
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
  };

  const handleTableChange = (e: any, pageTable: number) => {
    console.log('pageTable', pageTable);
  };

  const handleClickPagination = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClosePagination = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <MainCard title={renderSearchForm()}>
        <TableContainer>
          <Table aria-label="simple table">
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
                <TableRow hover key={row?.id}>
                  <TableCell>{row?.name}</TableCell>
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
        <Grid item xs={12} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Pagination count={10} color="primary" onChange={handleTableChange} />
            </Grid>
            <Grid item>
              <Button
                size="large"
                sx={{ color: theme.palette.grey[900] }}
                color="secondary"
                endIcon={<ExpandMoreRoundedIcon />}
                onClick={handleClickPagination}
              >
                10 Rows
              </Button>
              <Menu
                id="menu-user-list-style1"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClosePagination}
                variant="selectedMenu"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <MenuItem onClick={handleClosePagination}> 10 Rows</MenuItem>
                <MenuItem onClick={handleClosePagination}> 20 Rows</MenuItem>
                <MenuItem onClick={handleClosePagination}> 30 Rows </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
      <CandidateDrawer visible={visibleAdd} dataEdit={dataEdit} />
      <CandidateModal visible={visibleModal} dataEdit={dataEdit} />
    </>
  );
};

export default InProgress;
