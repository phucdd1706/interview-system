// THIRD-PARTY
import moment from 'moment';
import React, { useState } from 'react';

import { ButtonBase, Chip, IconButton, Link, Menu, MenuItem, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

// PROJECT IMPORTS
import { delAdministrator } from 'store/slices/user';
import { dispatch } from 'store';
import { UserProfile } from 'types/user-profile';
import { openSnackbar } from 'store/slices/snackbar';
import AlertAdminDelete from './AlertAdminDelete';
import EditAdmin from './EditAdmin';

interface Props {
  user: UserProfile;
  index: number;
}
const AdministratorList = ({ user, index }: Props) => {
  const theme = useTheme();
  const [openAdminDrawer, setOpenAdminDrawer] = useState<boolean>(false);
  const handleAdminDrawerOpen = () => {
    setOpenAdminDrawer((prevState) => !prevState);
  };

  const editAdmin = () => {
    setOpenAdminDrawer((prevState) => !prevState);
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
      dispatch(delAdministrator(user));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Deleted successfully!',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  };

  return (
    <>
      <TableRow hover key={index}>
        <TableCell sx={{ width: 110, minWidth: 110 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2">{user.id}</Typography>
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
            {user.name}
          </Link>
        </TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{user.dob ? moment(user.dob).format('DD/MM/YYYY') : 'N/A'}</TableCell>
        <TableCell>
          {user.gender === 'male' && 'Male'}
          {user.gender === 'female' && 'Female'}
          {(user.gender === null || user.gender === 'none') && 'N/A'}
        </TableCell>
        <TableCell>{moment(user.updated_at).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>
          {user.status === 0 && (
            <Chip
              label="Inactive"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                color: theme.palette.warning.dark
              }}
            />
          )}
          {user.status === 1 && (
            <Chip
              label="Active"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
                color: theme.palette.success.dark
              }}
            />
          )}
          {user.status === 2 && (
            <Chip
              label="Blocked"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light + 80,
                color: theme.palette.orange.dark
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
                editAdmin();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setOpenModal(true);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
          {openModal && <AlertAdminDelete name={user.name} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <EditAdmin user={user} open={openAdminDrawer} handleDrawerOpen={handleAdminDrawerOpen} />
    </>
  );
};

export default AdministratorList;
