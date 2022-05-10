// THIRD-PARTY
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
// PROJECT IMPORTS
import { ButtonBase, Chip, IconButton, Link, Menu, MenuItem, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { dispatch, RootState, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { DeleteRank, getRanksList } from 'store/slices/rank';
import { RankFilter, RankType } from 'types/rank';
import EditRank from './EditRank';
import AlertRankDelete from './AlertRankDelete';

interface Props {
  rank: RankType;
  index: number;
}

const Rank = ({ rank, index }: Props) => {
  const initialState: RankFilter = {
    search: '',
    status: '',
    id: '',
    currentPage: 1
  };
  const [filter] = useState(initialState);
  const Notification = (color: string, message: string) => {
    dispatch(
      openSnackbar({
        open: true,
        message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color
        },
        close: true
      })
    );
  };
  const rankState = useSelector((state: RootState) => state.rank);
  const theme = useTheme();
  const [edit, setEdit] = useState<boolean>(false);
  const [openRankDrawer, setOpenRankDrawer] = useState<boolean>(false);
  const handleRankDrawerOpen = () => {
    setOpenRankDrawer((prevState) => !prevState);
  };

  const editRank = async () => {
    await setEdit(true);
    setOpenRankDrawer((prevState) => !prevState);
  };

  const openPropertyModal = async () => {
    await setEdit(false);
    setOpenRankDrawer((prevState) => !prevState);
  };

  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleModalClose = (status: boolean) => {
    setOpenModal(false);
    if (status) {
      dispatch(
        DeleteRank({
          id: rank.id,
          callback: (response) => {
            if (response?.data?.success) {
              dispatch(getRanksList(filter));
              Notification('success', 'Delete successfully');
            } else {
              Notification('error', response?.message);
            }
          }
        })
      );
    }
  };

  return (
    <>
      <TableRow hover key={index}>
        <TableCell sx={{ pl: 3 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2">{20 * (rankState.currentPage - 1) + index + 1}</Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ width: '20%', overflow: 'hidden', maxWidth: 300 }} component="th" scope="row">
          <Link
            underline="hover"
            color="default"
            sx={{
              overflow: 'hidden',
              maxWidth: '285px',
              display: 'block',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              ':hover': { color: 'primary.main' },
              cursor: 'pointer'
            }}
            onClick={openPropertyModal}
          >
            {rank.name}
          </Link>
        </TableCell>
        <TableCell sx={{ width: 110, minWidth: 110, maxWidth: 250 }} component="th" scope="row">
          <Link
            underline="hover"
            color="default"
            sx={{
              overflow: 'hidden',
              display: 'block',
              maxWidth: '624px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              ':hover': { color: 'primary.main' },
              cursor: 'pointer'
            }}
          >
            {rank.description}
          </Link>
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(rank.created_at).format('DD/MM/yy hh:mm')}
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(rank.updated_at).format('DD/MM/yy hh:mm')}
        </TableCell>
        <TableCell>
          {rank.status === 0 && (
            <Chip
              label="Inactive"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                color: theme.palette.warning.dark
              }}
            />
          )}
          {rank.status === 1 && (
            <Chip
              label="Active"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
                color: theme.palette.success.dark
              }}
            />
          )}
        </TableCell>
        <TableCell align="center">
          <ButtonBase
            className="more-button"
            sx={{ borderRadius: '12px' }}
            onClick={handleClick}
            aria-controls="menu-comment"
            aria-haspopup="true"
          >
            <IconButton component="span" size="small" disableRipple>
              <MoreVertTwoToneIcon fontSize="inherit" />
            </IconButton>
          </ButtonBase>
          <Menu
            id="menu-comment"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            variant="selectedMenu"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                editRank();
              }}
            >
              <EditIcon fontSize="small" sx={{ color: '#2196f3', mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setOpenModal(true);
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: '#f44336', mr: 1 }} />
              Delete
            </MenuItem>
          </Menu>
          {openModal && <AlertRankDelete name={rank.name} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <EditRank rank={rank} edit={edit} open={openRankDrawer} handleDrawerOpen={handleRankDrawerOpen} />
    </>
  );
};
export default Rank;
