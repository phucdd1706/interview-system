// THIRD-PARTY
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect, useState, useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
// THIRD-PARTY
import {
  Button,
  Fab,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { debounce } from 'lodash';

import MainCard from 'ui-component/cards/MainCard';

// PROJECT IMPORTS
import NoDataImg from 'assets/images/logo/nodata.png';
import AddDepartment from 'views/pages/department/AddDepartment';
import DepartmentList from 'views/pages/department/DepartmentList';

import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getDepartmentList } from 'store/slices/department';
import { Department, DepartmentFilter, SelectProps } from 'types/department';

const SortStatus: SelectProps[] = [
  {
    value: '',
    label: 'All'
  },
  {
    value: 1,
    label: 'Active'
  },
  {
    value: 0,
    label: 'Inactive'
  }
];

const initialState: DepartmentFilter = {
  search: '',
  status: '',
  currentPage: 1,
  limit: 20
};

const Departments = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const departmentState = useSelector((state) => state.department);

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const spacingMD = matchDownMD ? 1 : 1.5;

  const [search, setSearch] = useState('');
  const [data, setData] = useState<Department[]>([]);
  const [departFilter, setDepartFilter] = useState(initialState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openSort = Boolean(anchorEl);
  const sortLabel = SortStatus.filter((items) => items.value === departFilter.status);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setDepartFilter({ ...departFilter, currentPage: page! });
  };

  const handleSearch = (searchValue: string) => {
    setDepartFilter({ ...departFilter, search: searchValue });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(handleSearch, 300), []);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setDepartFilter({ ...departFilter, status: index });
    setAnchorEl(null);
  };

  const handleSortStatusClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const addAdministrator = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const getListDepart = async () => {
    await dispatch(getDepartmentList(departFilter));
  };

  useEffect(() => {
    setData(departmentState.department);
  }, [departmentState]);

  useEffect(() => {
    getListDepart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departFilter]);

  return (
    <MainCard
      title={
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
                    value={search}
                    placeholder="Search...."
                    size="small"
                    onChange={(e) => {
                      setSearch(e.target.value);
                      debounceSearch(e.target.value);
                    }}
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
                      onClick={handleClickListItem}
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {sortLabel.length > 0 && sortLabel[0].label}
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={openSort}
                      onClose={handleSortStatusClose}
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
                          selected={status.value === departFilter.status}
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
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            <Tooltip title="Add">
              <Fab
                color="primary"
                size="small"
                onClick={addAdministrator}
                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
              >
                <AddIcon fontSize="small" />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      }
      content={false}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3, width: '5%' }}>STT</TableCell>
              <TableCell sx={{ width: '20%' }}>Name</TableCell>
              <TableCell sx={{ width: 'auto' }}>Code</TableCell>
              <TableCell sx={{ width: '10%' }}>Created At</TableCell>
              <TableCell sx={{ width: '10%' }}>Updated At</TableCell>
              <TableCell sx={{ width: '8%' }}>Status</TableCell>
              <TableCell sx={{ pr: 3, width: '5%' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((department, index) => (
                <DepartmentList key={department.id} department={department} index={index} departFilter={departFilter} />
              ))}
          </TableBody>
        </Table>
        <AddDepartment open={openDrawer} edit handleDrawerOpen={handleDrawerOpen} departFilter={departFilter} department={{}} />
      </TableContainer>
      {data?.length === 0 && (
        <div className="noData">
          <img src={NoDataImg} alt="NoDataImg" style={{ marginRight: matchDownSM ? 8 : 16 }} />
          <p>No data available</p>
        </div>
      )}
      {data?.length > 0 && (
        <Grid item xs={12} sx={{ p: 3 }}>
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Pagination
                size={matchDownSM ? 'small' : 'medium'}
                count={departmentState.pageCount}
                page={departmentState.currentPage}
                onChange={handleChange}
                color="primary"
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </MainCard>
  );
};

export default Departments;
