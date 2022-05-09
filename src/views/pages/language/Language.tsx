// THIRD-PARTY
import React, { useState } from 'react';
import { ButtonBase, Link, TableCell, TableRow, Chip, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { Edit, Delete } from '@mui/icons-material';

// PROJECT IMPORTS
import { removeLanguage } from 'store/slices/language';
import { Languages } from 'types/language';
import AddLanguage from 'views/pages/language/AddLanguage';
import AlertDelete from 'ui-component/Alert/AlertDelete';
import { openSnackbar } from 'store/slices/snackbar';
import { RootState, dispatch, useSelector } from 'store/index';

interface Props {
  language: Languages;
  index: number;
  getList: () => void;
}

const Language = ({ language, index, getList }: Props) => {
  const theme = useTheme();

  const [visibleAdd, setVisibleAdd] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const languageState = useSelector((state: RootState) => state.language);
  const [edit, setEdit] = useState(false);
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

  const handleVisibleModal = async () => {
    await setEdit(true);
    setVisibleAdd((prevState) => !prevState);
  };

  const openPropertyModal = async () => {
    await setEdit(false);
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
          <Edit fontSize="small" sx={{ color: '#2196f3', mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose();
            setOpenModal(true);
          }}
        >
          <Delete fontSize="small" sx={{ color: '#f44336', mr: 1 }} />
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
    </>
  );

  return (
    <>
      <TableRow hover key={language?.id}>
        <TableCell sx={{ width: '5%', pl: 3 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2">{index + 20 * (languageState?.currentPage - 1) + 1}</Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ width: '20%', overflow: 'hidden' }} component="th" scope="row">
          <Link
            underline="hover"
            color="default"
            sx={{
              overflow: 'hidden',
              display: 'block',
              maxWidth: '285px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              ':hover': { color: 'primary.main' },
              cursor: 'pointer'
            }}
            onClick={openPropertyModal}
          >
            {language?.name}
          </Link>
        </TableCell>
        <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '624px' }}>{language?.description}</TableCell>
        <TableCell>{moment(language?.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>{moment(language?.updated_at).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>{renderStatus(language?.status)}</TableCell>
        <TableCell align="center">{renderMenuButton()}</TableCell>
        {openModal && <AlertDelete name={language?.name} open={openModal} handleClose={handleRemove} />}
      </TableRow>
      {visibleAdd && (
        <AddLanguage
          visible={visibleAdd}
          edit={edit}
          dataEdit={language}
          handleVisibleModal={handleVisibleModal}
          getList={() => getList()}
        />
      )}
    </>
  );
};

export default Language;
