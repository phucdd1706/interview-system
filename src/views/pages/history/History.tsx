// THIRD-PARTY
import React, { useState } from 'react';
import { ButtonBase, TableCell, TableRow, Chip, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { Link } from 'react-router-dom';

// PROJECT IMPORTS
import { removeCandidate } from 'store/slices/history';
import AddHistory from 'views/pages/history/AddHistory';
import AlertDelete from 'ui-component/Alert/AlertDelete';
import { openSnackbar } from 'store/slices/snackbar';
import { RootState, dispatch, useSelector } from 'store';
import { Candidates } from 'types/history';

interface Props {
  history: Candidates;
  index: number;
  getList: () => void;
}

const History = ({ history, index, getList }: Props) => {
  const theme = useTheme();

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const historyState = useSelector((state: RootState) => state.history);

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
          id: history.id,
          callback: (res) => {
            if (res?.data?.success) {
              getList();
              openNotification('success', 'Delete record successfully!');
            } else {
              openNotification('error', res?.message);
            }
          }
        })
      );
    }
  };

  const openNotification = (color: string, message: string) => {
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
        <MenuItem>
          <Link to={`/applicant/${history.id}`} style={{ textDecoration: 'none', color: '#616161' }}>
            Interview
          </Link>
        </MenuItem>

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

  const handleVisibleModal = () => {
    setVisibleAdd((prevState) => !prevState);
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
    </>
  );

  return (
    <>
      <TableRow hover key={history?.id}>
        <TableCell sx={{ width: 110, minWidth: 110 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2">{index + 20 * (historyState.currentPage - 1) + 1}</Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ width: 250, minWidth: 200, maxWidth: 'calc(100vw - 850px)' }} component="th" scope="row">
          {history.name}
        </TableCell>
        <TableCell>{history?.email}</TableCell>
        <TableCell>{history?.age}</TableCell>
        <TableCell>{moment(history.time).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>{renderStatus(history?.status)}</TableCell>
        <TableCell sx={{ width: 60, minWidth: 60 }}>{renderMenuButton()}</TableCell>
        {openModal && <AlertDelete name={history?.name} open={openModal} handleClose={handleRemove} />}
      </TableRow>
      <AddHistory visible={visibleAdd} dataEdit={history} handleVisibleModal={handleVisibleModal} getList={() => getList()} />
    </>
  );
};

export default History;
