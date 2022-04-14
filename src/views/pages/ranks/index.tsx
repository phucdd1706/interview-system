// THIRD-PARTY
import AddIcon from '@mui/icons-material/AddTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MainCard from 'ui-component/cards/MainCard';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SortStatus from 'views/pages/ranks/SortStatus';
import {
  Button,
  Fab,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// PROJECT IMPORTS
import RanksList from 'views/pages/ranks/RanksList';
import { dispatch, useSelector } from 'store';
import { DeleteRank, getRanksList } from 'store/slices/rank';
import { Rank, RankFilter } from 'types/rank';
import AddRank from './AddRank';
import { gridSpacing } from 'store/constant';
import EditRank from './EditRank';
import InfoRank from './InfoRank';
import { openSnackbar } from 'store/slices/snackbar';
import AlertCustomerDelete from '../customer/AlertCustomerDelete';

interface Props {
  rank: Rank;
}
const Ranks = ({ rank }: Props) => {
  const theme = useTheme();
  const [id, setId] = useState('');

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const rankState = useSelector((state) => state.rank);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setFilter({ ...filter, currentPage: page! });
  };

  const spacingMD = matchDownMD ? 1 : 1.5;

  const [open, setOpen] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen((prevState) => !prevState);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = (rankId: string) => {
    setId(rankId);
    setOpenEdit(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const handleInfo = (rankId: string) => {
    setId(rankId);
    setOpenInfo(true);
  };

  const initialState: RankFilter = {
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
      await dispatch(getRanksList(filter));
    }, 400);
  };

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: any) => {
    setFilter({ ...filter, status: index });
    setAnchorEl(null);
  };
  const sortLabel = SortStatus.filter((items) => items.value === filter.status);

  const handleDeleteRank = (status: boolean) => {
    setOpenDel(false);
    if (status) {
      dispatch(DeleteRank(rank));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Deleted successfully!',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: true
        })
      );
    }
  };

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
      <AddRank open={open} handleCloseDialog={handleCloseDialog} />
      <EditRank open={openEdit} handleCloseDialog={handleCloseEdit} id={id} />
      <InfoRank open={openInfo} handleCloseDialog={handleCloseInfo} id={id} />
      <RanksList handleDelete={setOpenDel} handleEdit={handleEdit} handleInfo={handleInfo} id={id} />
      {openDel && <AlertCustomerDelete name={rank.name} open={openDel} handleClose={handleDeleteRank} />}
      <Grid item xs={12} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" spacing={gridSpacing}>
          <Grid item>
            <Pagination count={rankState.pageCount} page={rankState.currentPage} onChange={handleChange} color="primary" />
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Ranks;
