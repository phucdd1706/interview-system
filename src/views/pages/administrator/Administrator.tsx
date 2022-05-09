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

import AlertDelete from 'ui-component/Alert/AlertDelete';
import AddAdministrator from './AddAdministrator';

interface Props {
  administrator: UserProfile;
  index: number;
  adminFilter: UserFilter;
}

const Administrator = ({ administrator, index, adminFilter }: Props) => {
  const theme = useTheme();
  const administratorState = useSelector((state) => state.user);
  const [editing, setEditing] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [openAdministratorDrawer, setOpenAdministratorDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleAdministratorDrawerOpen = async () => {
    await setEditing(false);
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

  const editAdministrator = async () => {
    await setEditing(true);
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
              dispatch(getAdministratorList(adminFilter));
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
        <TableCell sx={{ pl: 3 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2">{(administratorState.currentPage - 1) * 20 + index + 1}</Typography>
          </Stack>
        </TableCell>
        <TableCell
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            maxWidth: '185px',
            cursor: 'pointer',
            ':hover': { color: 'primary.main', textDecoration: 'underline' }
          }}
          component="th"
          scope="row"
          onClick={handleAdministratorDrawerOpen}
        >
          {administrator.name}
        </TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{administrator.username}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '290px' }}>{administrator.email}</TableCell>
        <TableCell>{administrator.phone}</TableCell>
        <TableCell>{administrator.dob ? moment(administrator.dob).format('DD/MM/YYYY') : 'N/A'}</TableCell>
        <TableCell>
          {administrator.gender === 'male' && 'Male'}
          {administrator.gender === 'female' && 'Female'}
          {(administrator.gender === null || administrator.gender === 'none') && 'N/A'}
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(administrator.created_at).format('DD/MM/YYYY HH:mm')}
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(administrator.updated_at).format('DD/MM/YYYY HH:mm')}
        </TableCell>
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
          {openModal && <AlertDelete name={administrator.name} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <AddAdministrator
        editing={editing}
        administrator={administrator}
        adminFilter={adminFilter}
        open={openAdministratorDrawer}
        handleDrawerOpen={handleAdministratorDrawerOpen}
      />
    </>
  );
};
export default Administrator;
