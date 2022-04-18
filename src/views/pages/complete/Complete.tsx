// THIRD-PARTY
import React, { useState } from 'react';
import { ButtonBase, TableCell, TableRow, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

// PROJECT IMPORTS
import { removeCandidate } from 'store/slices/complete';
import AddComplete from 'views/pages/complete/AddComplete';
import AlertCompleteDelete from 'views/pages/complete/AlertCompleteDelete';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from 'store';

const Complete = (props: any) => {
  const { complete } = props;
  const theme = useTheme();
  const token = localStorage.getItem('serviceToken');

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = (status: boolean) => {
    setOpenModal(false);
    if (status) {
      dispatch(
        removeCandidate({
          id: complete.id,
          token,
          callback: (res) => {
            if (res?.data?.success) {
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Delete record successfully!',
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: true
                })
              );
            } else {
              dispatch(
                openSnackbar({
                  open: true,
                  message: res?.message,
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  variant: 'alert',
                  alert: {
                    color: 'error'
                  },
                  close: true
                })
              );
            }
          }
        })
      );
    }
  };

  const renderStatus = (status: number) => (
    <>
      {status === 0 && (
        <Chip
          label="Inactive"
          size="small"
          sx={{
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
            color: theme.palette.warning.dark
          }}
        />
      )}
      {status === 1 && (
        <Chip
          label="Active"
          size="small"
          sx={{
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
            color: theme.palette.success.dark
          }}
        />
      )}
      {status === 2 && (
        <Chip
          label="Blocked"
          size="small"
          sx={{
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light + 80,
            color: theme.palette.orange.dark
          }}
        />
      )}
    </>
  );

  const renderMenuButton = () => (
    <>
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
            setVisibleAdd(!visibleAdd);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose();
            setOpenModal(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <>
      <TableRow hover key={complete?.id}>
        <TableCell>{complete?.id}</TableCell>
        <TableCell>{complete?.name}</TableCell>
        <TableCell>{complete?.phone}</TableCell>
        <TableCell>{complete?.email}</TableCell>
        <TableCell>{moment(complete.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>{renderStatus(complete?.status)}</TableCell>
        <TableCell sx={{ width: 60, minWidth: 60 }}>{renderMenuButton()}</TableCell>
        {openModal && <AlertCompleteDelete name={complete?.name} open={openModal} handleClose={handleRemove} />}
      </TableRow>
      <AddComplete visible={visibleAdd} dataEdit={complete} />
    </>
  );
};

export default Complete;
