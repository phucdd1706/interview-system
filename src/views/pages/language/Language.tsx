// THIRD-PARTY
import React, { useState } from 'react';
import { ButtonBase, Link, TableCell, TableRow, Chip, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

// PROJECT IMPORTS
import { removeLanguage } from 'store/slices/language';
import { Languages } from 'types/language';
import AddLanguage from 'views/pages/language/AddLanguage';
import AlertDelete from 'ui-component/Alert/AlertDelete';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from 'store';

interface Props {
  language: Languages;
}

const Language = ({ language }: Props) => {
  const theme = useTheme();

  const [visibleAdd, setVisibleAdd] = useState<boolean>(false);
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
        removeLanguage({
          id: language.id,
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

  const handleVisibleModal = () => {
    setVisibleAdd((prevState) => !prevState);
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

  return (
    <>
      <TableRow hover key={language?.id}>
        <TableCell sx={{ width: 110, minWidth: 110 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2">{language.id}</Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ width: 200, minWidth: 200, maxWidth: 'calc(100vw - 850px)' }} component="th" scope="row">
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
            {language?.name}
          </Link>
        </TableCell>
        <TableCell>{language?.description}</TableCell>
        <TableCell>{moment(language.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>{renderStatus(language?.status)}</TableCell>
        <TableCell sx={{ width: 60, minWidth: 60 }}>{renderMenuButton()}</TableCell>
        {openModal && <AlertDelete name={language?.name} open={openModal} handleClose={handleRemove} />}
      </TableRow>
      <AddLanguage visible={visibleAdd} dataEdit={language} handleVisibleModal={handleVisibleModal} />
    </>
  );
};

export default Language;
