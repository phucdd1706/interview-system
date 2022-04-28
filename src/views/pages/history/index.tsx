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
  Pagination,
  Stack,
  useMediaQuery,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
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
import 'assets/scss/style.scss';
import NoDataImg from 'assets/images/logo/nodata.png';

const Index = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const spacingMD = matchDownMD ? 1 : 1.5;

  const historyState = useSelector((state: RootState) => state.history);

  const [candidate, setCandidate] = useState<Candidates[]>([]);
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

  const renderSearchForm = () => {
    const sortLabel = SortStatus?.filter((items) => items.value === filters.status);

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownMD ? 0.5 : 2}>
            <Grid item>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={matchDownSM ? 2 : spacingMD}>
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

                <Typography sx={{ display: 'flex', fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>|</Typography>

                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: 'flex' }}>
                  {!matchDownSM && <Typography variant="h5">Sort by: </Typography>}
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
                <TableCell sx={{ pr: 3, width: '5%' }}>#</TableCell>
                <TableCell sx={{ width: '20%' }}>Name</TableCell>
                <TableCell sx={{ width: '25%' }}>Email</TableCell>
                <TableCell sx={{ width: '15%' }}>Age</TableCell>
                <TableCell sx={{ width: '15%' }}>Interview Time</TableCell>
                <TableCell sx={{ width: '10%' }}>Status</TableCell>
                <TableCell align="center" sx={{ pr: 3, width: '10%' }}>
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
        {candidate?.length === 0 && (
          <div className="noData">
            <img src={NoDataImg} alt="NoDataImg" style={{ marginRight: matchDownSM ? 8 : 16 }} />
            <p>No data available</p>
          </div>
        )}
        {candidate?.length > 0 && (
          <Grid item xs={12} sx={{ p: 3, pl: matchDownSM ? 0 : 3 }}>
            <Grid container justifyContent="space-between" spacing={gridSpacing}>
              <Grid item>
                <Pagination
                  size={matchDownSM ? 'small' : 'medium'}
                  count={historyState.pageCount}
                  page={historyState.currentPage}
                  color="primary"
                  onChange={handleTableChange}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </MainCard>
    </>
  );
};

export default Index;
