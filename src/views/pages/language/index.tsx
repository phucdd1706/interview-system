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
  useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { RootState, useDispatch, useSelector } from 'store/index';
import { Languages, SearchValues } from 'types/language';
import { fetchLanguages } from 'store/slices/language';
import Language from 'views/pages/language/Language';
import { gridSpacing } from '../../../store/constant';
import AddLanguage from 'views/pages/language/AddLanguage';
import StatusFilters from 'ui-component/CommonFilters/StatusFilters';
import 'assets/scss/style.scss';
import NoDataImg from 'assets/images/logo/nodata.png';

const Index = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const spacingMD = matchDownMD ? 1 : 1.5;

  const languageState = useSelector((state: RootState) => state.language);

  const [language, setLanguage] = useState<Languages[]>([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [anchorElSort, setAnchorElSort] = useState(null);

  const [filters, setFilters] = useState<SearchValues>({
    search: '',
    status: '',
    currentPage: 1,
    limit: 20
  });

  useEffect(() => {
    setLanguage(languageState.language);
  }, [languageState]);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    filterData();
  }, [filters]);

  const getList = () => {
    dispatch(fetchLanguages({ params: filters }));
  };

  const filterData = async () => {
    dispatch(fetchLanguages({ params: filters }));
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setFilters({ ...filters, status: index });
    setAnchorElSort(null);
  };

  const handleTableChange = (e: any, pageTable: number) => {
    setFilters({ ...filters, currentPage: pageTable! });
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

  const addInProgress = () => {
    setVisibleAdd(!visibleAdd);
  };

  const handleVisibleModal = () => {
    setVisibleAdd((prevState) => !prevState);
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
      <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
        <Tooltip title="Add">
          <Fab color="primary" size="small" onClick={addInProgress} sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}>
            <AddIcon fontSize="small" />
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  );

  return (
    <>
      <MainCard title={renderSearchForm()} content={false}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 3 }}>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ '& th,& td': { whiteSpace: 'nowrap' } }}>
              {language?.map((row, index: number) => (
                <Language key={row?.id} language={row} index={index} getList={() => getList()} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {language?.length === 0 && (
          <div className="noData">
            <img src={NoDataImg} alt="NoDataImg" style={{ marginRight: matchDownSM ? 8 : 16 }} />
            <p>No data available</p>
          </div>
        )}
        {language?.length > 0 && (
          <Grid item xs={12} sx={{ p: 3 }}>
            <Grid container justifyContent="space-between" spacing={gridSpacing}>
              <Grid item>
                <Pagination count={languageState.pageCount} page={languageState.currentPage} color="primary" onChange={handleTableChange} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </MainCard>
      <AddLanguage visible={visibleAdd} dataEdit={{}} handleVisibleModal={handleVisibleModal} getList={() => getList()} />
    </>
  );
};

export default Index;
