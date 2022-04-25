// THIRD-PARTY
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { RootState } from 'store/index';
import { Candidates, SearchValues } from 'types/complete';
import { fetchCandidates } from 'store/slices/complete';
import Complete from './Complete';
import { gridSpacing } from '../../../store/constant';
import RankFilters from 'components/Common/RankFilters';
import StatusFilters from 'components/Common/StatusFilters';

const Index = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const spacingMD = matchDownMD ? 1 : 1.5;

  const completeState = useSelector((state: RootState) => state.complete);

  const [candidate, setCandidate] = useState<Candidates[]>([]);
  const [anchorElSort, setAnchorElSort] = useState(null);
  const [anchorElRank, setAnchorElRank] = useState(null);
  const initialState: SearchValues = {
    search: '',
    rank: '',
    status: '',
    currentPage: 1,
    limit: 20
  };

  const [filters, setFilters] = useState(initialState);

  useEffect(() => {
    setCandidate(completeState.complete);
  }, [completeState]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    dispatch(fetchCandidates({ params: filters }));
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setFilters({ ...filters, status: index });
    setAnchorElSort(null);
  };

  const handleRankClick = (event: React.MouseEvent<HTMLElement>, index: any) => {
    setFilters({ ...filters, rank: index });
    setAnchorElRank(null);
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

  const handleRank = (event: any) => {
    setAnchorElRank(event.currentTarget);
  };

  const handleCloseRank = () => {
    setAnchorElRank(null);
  };

  const renderSearchForm = () => (
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

              <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>|</Typography>

              <RankFilters
                filters={filters}
                anchorElRank={anchorElRank}
                handleRank={handleRank}
                handleCloseRank={handleCloseRank}
                handleRankClick={handleRankClick}
              />

              <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>|</Typography>

              <StatusFilters
                filters={filters}
                anchorElSort={anchorElSort}
                handleSort={handleSort}
                handleCloseSort={handleCloseSort}
                handleSortClick={handleSortClick}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

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
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ '& th,& td': { whiteSpace: 'nowrap' } }}>
              {candidate?.map((row) => (
                <Complete key={row?.id} complete={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid item xs={12} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Pagination count={completeState.pageCount} page={completeState.currentPage} color="primary" onChange={handleTableChange} />
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default Index;
