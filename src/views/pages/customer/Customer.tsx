// THIRD-PARTY
import React, { useState } from 'react';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonBase, Chip, IconButton, Menu, MenuItem, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';
// PROJECT IMPORTS
import { UserProfile } from 'types/user-profile';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import EditCustomer from 'views/pages/customer/EditCustomer';
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { deleteCustomer } from 'store/slices/customer';
import AlertCustomerDelete from 'views/pages/customer/AlertCustomerDelete';

interface Props {
  customer: UserProfile;
  index: number;
}

const Customer = ({ customer, index }: Props) => {
  const theme = useTheme();
  const customerState = useSelector((state) => state.customer);
  const [openCustomerDrawer, setOpenCustomerDrawer] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const handleCustomerDrawerOpen = async () => {
    await setEditing(false);
    setOpenCustomerDrawer((prevState) => !prevState);
  };

  const editCustomer = async () => {
    await setEditing(true);
    setOpenCustomerDrawer((prevState) => !prevState);
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
      dispatch(deleteCustomer(customer));
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
        <TableCell sx={{ pl: 3 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2">{(customerState.currentPage - 1) * 20 + index + 1}</Typography>
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
          onClick={handleCustomerDrawerOpen}
        >
          {customer.name}
        </TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{customer.username}</TableCell>
        <TableCell sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '290px' }}>{customer.email}</TableCell>
        <TableCell>{customer.phone}</TableCell>
        <TableCell>{customer.dob ? moment(customer.dob).format('DD/MM/YYYY') : 'N/A'}</TableCell>
        <TableCell>
          {customer.gender === 'male' && 'Male'}
          {customer.gender === 'female' && 'Female'}
          {(customer.gender === null || customer.gender === 'none') && 'N/A'}
        </TableCell>
        <TableCell>{moment(customer.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>{moment(customer.updated_at).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>
          {customer.status === 0 && (
            <Chip
              label="Inactive"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                color: theme.palette.warning.dark
              }}
            />
          )}
          {customer.status === 1 && (
            <Chip
              label="Active"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
                color: theme.palette.success.dark
              }}
            />
          )}
          {customer.status === 2 && (
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
                editCustomer();
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
          {openModal && <AlertCustomerDelete name={customer.name} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <EditCustomer customer={customer} editing={editing} open={openCustomerDrawer} handleDrawerOpen={handleCustomerDrawerOpen} />
    </>
  );
};
export default Customer;
