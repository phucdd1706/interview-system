// THIRD-PARTY
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { Button, Fab, Grid, InputAdornment, Menu, MenuItem, Stack, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

// PROJECT IMPORTS
import AddAdministrator from 'views/pages/administrator/AddAdministrator';
import AdministratorList from 'views/pages/administrator/AdministratorList';
import MainCard from 'ui-component/cards/MainCard';
import SortStatus from 'views/pages/administrator/SortStatus';
import { dispatch } from 'store';
import { delAdministrator, getAdministratorList } from 'store/slices/user';
import { UserFilter } from 'types/user';
import { gridSpacing } from '../../../store/constant';
import EditAdmin from './EditAdmin';
import InfoAdmin from './InfoAdmin';

const Administrator = () => {
  const theme = useTheme();
  const [id, setId] = useState('');
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const spacingMD = matchDownMD ? 1 : 1.5;

  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleCloseInfo = () => {
    setOpenInfo(false);
  };
  const handleClickOpenInfo = () => {
    setOpenInfo(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCallbackInfo = (adminId: string) => {
    setId(adminId);
    setOpenInfo(true);
  };
  const handleCallbackEdit = (adminId: string) => {
    setId(adminId);
    setOpenEdit(true);
  };
  const handleCallbackDel = (adminId: string) => {
    setId(adminId);
    dispatch(delAdministrator(adminId));
    window.location.reload();
  };
  const initialState: UserFilter = {
    search: '',
    status: ''
  };
  const [filter, setFilter] = useState(initialState);

  const handleSearch = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    const newString = event?.target.value;
    setFilter({ ...filter, search: newString! });
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openSort = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterData = async () => {
    setTimeout(async () => {
      await dispatch(getAdministratorList(filter));
    }, 400);
  };

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: string | '') => {
    setFilter({ ...filter, status: index });
    setAnchorEl(null);
  };
  const sortLabel = SortStatus.filter((items) => items.value === filter.status);

  const handleClickPagination = (event: React.MouseEvent) => {};

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
                    value={filter.search}
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
                      onClose={handleClose}
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
                          selected={status.value === filter.status}
                          onClick={(event) => handleMenuItemClick(event, status.value || '')}
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
                onClick={handleClickOpenDialog}
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
      <AddAdministrator open={open} handleCloseDialog={handleCloseDialog} />
      <InfoAdmin open={openInfo} handleCloseDialog={handleCloseInfo} id={id} />
      <EditAdmin open={openEdit} handleCloseDialog={handleCloseEdit} id={id} />
      <AdministratorList
        handleInfor={handleClickOpenInfo}
        handleCallbackInfo={handleCallbackInfo}
        handleCallbackEdit={handleCallbackEdit}
        handleCallbackDel={handleCallbackDel}
        id={id}
      />

      <Grid item xs={12} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" spacing={gridSpacing}>
          <Grid item>{/* <Pagination count={10} color="primary" /> */}</Grid>
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
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
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
              <MenuItem onClick={handleClose}> 10 Rows</MenuItem>
              <MenuItem onClick={handleClose}> 20 Rows</MenuItem>
              <MenuItem onClick={handleClose}> 30 Rows </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Administrator;
