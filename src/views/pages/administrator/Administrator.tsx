import React, { useState } from 'react';
// THIRD-PARTY
import { ButtonBase, Chip, IconButton, Link, Menu, MenuItem, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

import moment from 'moment';

// PROJECT IMPORTS
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { deleteAdministrator, getAdministratorList } from 'store/slices/user';

import { UserFilter } from 'types/user';
import { UserProfile } from 'types/user-profile';

import EditAdministrator from 'views/pages/administrator/EditAdministrator';
import AlertAdministratorDelete from 'views/pages/administrator/AlertAdministratorDelete';

interface Props {
  administrator: UserProfile;
  index: number;
}
const initialState: UserFilter = {
  search: '',
  status: '',
  currentPage: 1,
  limit: 20
};

const Administrator = ({ administrator, index }: Props) => {
  const theme = useTheme();
  const administratorState = useSelector((state) => state.user);

  const [filter] = useState(initialState);
  const [openModal, setOpenModal] = useState(false);
  const [openAdministratorDrawer, setOpenAdministratorDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleAdministratorDrawerOpen = () => {
    setOpenAdministratorDrawer((prevState) => !prevState);
  };

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

  const editAdministrator = () => {
    setOpenAdministratorDrawer((prevState) => !prevState);
  };

  const handleModalClose = (status: boolean) => {
    setOpenModal(false);
    if (status) {
      dispatch(
        deleteAdministrator({
          id: administrator.id,
          callback: (resp) => {
            if (resp?.data?.success) {
              dispatch(getAdministratorList(filter));
              Notification('success', 'Deleted successfully!');
            } else {
              Notification('error', resp?.message);
            }
          }
        })
      );
    }
  };
  return (
    <>
      <TableRow hover key={index}>
        <TableCell sx={{ width: 110, minWidth: 110 }}>
          <Stack direction="row" spacing={0.5} style={{ marginLeft: '15px' }}>
            <Typography variant="body2">{(administratorState.currentPage - 1) * 20 + index + 1}</Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ width: 110, minWidth: 110, maxWidth: 'calc(100vw - 850px)' }} component="th" scope="row">
          <Link
            underline="hover"
            color="default"
            sx={{
              overflow: 'hidden',
              display: 'block',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              ':hover': { color: 'primary.main' },
              cursor: 'pointer'
            }}
          >
            {administrator.name}
          </Link>
        </TableCell>
        <TableCell>{administrator.username}</TableCell>
        <TableCell>{administrator.email}</TableCell>
        <TableCell>{administrator.phone}</TableCell>
        <TableCell>{administrator.dob ? moment(administrator.dob).format('DD/MM/YYYY') : 'N/A'}</TableCell>
        <TableCell>
          {administrator.gender === 'male' && 'Male'}
          {administrator.gender === 'female' && 'Female'}
          {(administrator.gender === null || administrator.gender === 'none') && 'N/A'}
        </TableCell>
        <TableCell>{moment(administrator.updated_at).format('DD/MM/YYYY ')}</TableCell>
        <TableCell>
          {administrator.status === 0 && (
            <Chip
              label="Inactive"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                color: theme.palette.warning.dark
              }}
            />
          )}
          {administrator.status === 1 && (
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
        <TableCell sx={{ width: 60, minWidth: 60 }}>
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
                editAdministrator();
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
          {openModal && <AlertAdministratorDelete name={administrator.name} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <EditAdministrator administrator={administrator} open={openAdministratorDrawer} handleDrawerOpen={handleAdministratorDrawerOpen} />
    </>
  );
};
export default Administrator;
