// THIRD-PARTY
import React, { useState } from 'react';
import moment from 'moment';

// PROJECT IMPORTS
import { UserProfile } from 'types/user-profile';
import { ButtonBase, Chip, IconButton, Link, Menu, MenuItem, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import EditAdministrator from 'views/pages/administrator/EditAdministrator';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { deleteAdministrator } from 'store/slices/user';
import AlertAdministratorDelete from 'views/pages/administrator/AlertAdministratorDelete';

interface Props {
  administrator: UserProfile;
  index: number;
}

const Administrator = ({ administrator, index }: Props) => {
  const theme = useTheme();
  const [openAdministratorDrawer, setOpenAdministratorDrawer] = useState<boolean>(false);
  const handleAdministratorDrawerOpen = () => {
    setOpenAdministratorDrawer((prevState) => !prevState);
  };

  const editAdministrator = () => {
    setOpenAdministratorDrawer((prevState) => !prevState);
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
      dispatch(deleteAdministrator(administrator));
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
    <>
      <TableRow hover key={index}>
        <TableCell sx={{ width: 110, minWidth: 110 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2">{administrator.id}</Typography>
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
        <TableCell>{moment(administrator.updated_at).format('DD/MM/YYYY HH:mm')}</TableCell>
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
          {administrator.status === 2 && (
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
                editAdministrator();
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
          {openModal && <AlertAdministratorDelete name={administrator.name} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <EditAdministrator administrator={administrator} open={openAdministratorDrawer} handleDrawerOpen={handleAdministratorDrawerOpen} />
    </>
  );
};
export default Administrator;
