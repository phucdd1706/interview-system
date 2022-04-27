// THIRD-PARTY
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  InputAdornment,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Fab,
  Tooltip,
  Pagination,
  Stack,
  useMediaQuery,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { RootState, useDispatch, useSelector } from 'store/index';
import { Candidates, SearchValues, Status } from 'types/history';
import { fetchCandidates } from 'store/slices/history';
import History from 'views/pages/history/History';
import { gridSpacing } from '../../../store/constant';
import AddHistory from 'views/pages/history/AddHistory';

const Index = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const spacingMD = matchDownMD ? 1 : 1.5;

  const historyState = useSelector((state: RootState) => state.history);

  const [candidate, setCandidate] = useState<Candidates[]>([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [anchorElSort, setAnchorElSort] = useState(null);
  const openSort = Boolean(anchorElSort);

  const initialState: SearchValues = {
    search: '',
    status: '',
    currentPage: 1,
    limit: 20
  };

  const SortStatus: Status[] = [
    {
      value: '',
      label: 'All'
    },
    {
      value: 0,
      label: 'InProgress'
    },
    {
      value: 1,
      label: 'Complete'
    }
  ];

  const [filters, setFilters] = useState(initialState);

  useEffect(() => {
    setCandidate(historyState.history);
  }, [historyState]);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    filterData();
  }, [filters]);

  const getList = () => {
    dispatch(fetchCandidates({ params: filters }));
  };

  const filterData = async () => {
    dispatch(fetchCandidates({ params: filters }));
  };

  const handleSortClick = (index: number | string | undefined) => {
    setFilters({ ...filters, status: index });
    setAnchorElSort(null);
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    const newString = event?.target.value;
    setFilters({ ...filters, search: newString! });
  };

  const handleSort = (event: any) => {
    setAnchorElSort(event.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorElSort(null);
  };

  const addHistory = () => {
    setVisibleAdd(!visibleAdd);
  };

  const handleVisibleAdd = () => {
    setVisibleAdd((prevState) => !prevState);
  };

  const renderSearchForm = () => {
    const sortLabel = SortStatus?.filter((items) => items.value === filters.status);

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownMD ? 0.5 : 2}>
            <Grid item>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={matchDownSM ? 0.5 : spacingMD}>
                <TextField
                  sx={{ width: { xs: 140, md: 'auto' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  value={filters.search}
                  placeholder="Search...."
                  size="small"
                  onChange={handleSearch}
                />

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
                    {sortLabel?.length > 0 && sortLabel[0]?.label}
                  </Button>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorElSort}
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
                    {SortStatus?.map((status, index) => (
                      <MenuItem
                        sx={{ p: 1.5 }}
                        key={index}
                        selected={status.value === filters.status}
                        onClick={() => handleSortClick(status.value)}
                      >
                        {status.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
          <Tooltip title="Add">
            <Fab color="primary" size="small" onClick={addHistory} sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}>
              <AddIcon fontSize="small" />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
    );
  };

  const handleTableChange = (e: any, pageTable: number) => {
    setFilters({ ...filters, currentPage: pageTable! });
  };

  return (
    <>
      <MainCard title={renderSearchForm()}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pr: 3 }}>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Interview Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ '& th,& td': { whiteSpace: 'nowrap' } }}>
              {candidate?.map((row, index: number) => (
                <History key={row?.id} history={row} index={index} getList={() => getList()} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid item xs={12} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Pagination count={historyState.pageCount} page={historyState.currentPage} color="primary" onChange={handleTableChange} />
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
      <AddHistory visible={visibleAdd} dataEdit={{}} handleVisibleModal={handleVisibleAdd} getList={() => getList()} />
    </>
  );
};

export default Index;
