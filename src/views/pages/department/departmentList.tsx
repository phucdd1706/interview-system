// THIRD-PARTY
import React, { useState } from 'react';

import { ButtonBase, Chip, IconButton, Link, Menu, MenuItem, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

// PROJECT IMPORTS

import { dispatch } from 'store';

import { openSnackbar } from 'store/slices/snackbar';
import { Department } from 'types/department';
import { delDepartment } from 'store/slices/department';
import AlertDepartmentDelete from './AlertDepartmentDelete';
import EditDepartment from './EditDepartment';

interface Props {
  department: Department;
  index: number;
}
const DepartmentList = ({ department, index }: Props) => {
  const theme = useTheme();
  const [openDepartmentDrawer, setOpenDepartmentDrawer] = useState<boolean>(false);
  const handleDepartmentDrawerOpen = () => {
    setOpenDepartmentDrawer((prevState) => !prevState);
  };

  const editDepartment = () => {
    setOpenDepartmentDrawer((prevState) => !prevState);
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
      dispatch(delDepartment(department));
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
            <Typography variant="body2">{department.id}</Typography>
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
            {department.name}
          </Link>
        </TableCell>
        <TableCell>{department.code}</TableCell>
        <TableCell>
          {department.status === 0 && (
            <Chip
              label="Inactive"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                color: theme.palette.warning.dark
              }}
            />
          )}
          {department.status === 1 && (
            <Chip
              label="Active"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
                color: theme.palette.success.dark
              }}
            />
          )}
          {department.status === 2 && (
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
                editDepartment();
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
          {openModal && <AlertDepartmentDelete name={department.name} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <EditDepartment department={department} open={openDepartmentDrawer} handleDrawerOpen={handleDepartmentDrawerOpen} />
    </>
  );
};

export default DepartmentList;
