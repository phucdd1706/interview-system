// THIRD-PARTY
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
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
  Menu,
  MenuItem,
  Pagination,
  Stack,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { RootState } from 'store/index';
import { Candidates, SearchValues } from 'types/complete';
import { Rank } from 'types/rank';
import { fetchCandidates } from 'store/slices/complete';
import SortStatus from 'views/pages/complete/SortStatus';
import Complete from './Complete';
import { gridSpacing } from '../../../store/constant';
import { getRanksList } from 'store/slices/rank';

const Index = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const spacingMD = matchDownMD ? 1 : 1.5;

  const token = localStorage.getItem('serviceToken');
  const completeState = useSelector((state: RootState) => state.complete);

  const [dataRank, setDataRank] = useState<Rank[]>([]);
  const rankState = useSelector((state: RootState) => state.rank);
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

  const openSort = Boolean(anchorElSort);
  const openRank = Boolean(anchorElRank);

  useEffect(() => {
    setCandidate(completeState.complete);
  }, [completeState]);

  useEffect(() => {
    setDataRank(rankState.ranks);
  }, [rankState]);

  useEffect(() => {
    getList();
    dispatch(getRanksList());
  }, []);

  const getList = () => {
    dispatch(fetchCandidates({ params: filters, token }));
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
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

  const renderSearchForm = () => {
    const sortLabel = SortStatus.filter((items) => items.value === filters.status);
    const rankLabel = dataRank.filter((items) => items.id === filters.rank);

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
                    aria-expanded={openRank ? 'true' : undefined}
                    onClick={handleRank}
                    sx={{ color: 'grey.500', fontWeight: 400 }}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    {rankLabel.length > 0 && rankLabel[0].name}
                  </Button>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorElRank}
                    open={openRank}
                    onClose={handleCloseRank}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    {dataRank?.map((item, index) => (
                      <MenuItem
                        sx={{ p: 1.5 }}
                        key={index}
                        selected={item.id === filters.rank}
                        onClick={(event) => handleRankClick(event, item.id)}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Stack>

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
                    {SortStatus.map((status, index) => (
                      <MenuItem
                        sx={{ p: 1.5 }}
                        key={index}
                        selected={status.value === filters.status}
                        onClick={(event) => handleMenuItemClick(event, status.value)}
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
    console.log('pageTable', pageTable);
  };

  return (
    <>
      <MainCard title={renderSearchForm()}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
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
                <Complete key={row?.id} complete={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid item xs={12} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Pagination count={10} color="primary" onChange={handleTableChange} />
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default Index;
