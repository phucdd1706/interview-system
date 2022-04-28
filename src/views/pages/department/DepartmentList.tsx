// THIRD-PARTY
import React, { useState } from 'react';

import { ButtonBase, Chip, IconButton, Link, Menu, MenuItem, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

// PROJECT IMPORTS

import { dispatch, useSelector } from 'store';

import { openSnackbar } from 'store/slices/snackbar';
import { Department, DepartmentFilter } from 'types/department';
import { delDepartment, getDepartmentList } from 'store/slices/department';
import AlertDepartmentDelete from './AlertDepartmentDelete';
import EditDepartment from './EditDepartment';
import moment from 'moment';
import { margin } from '@mui/system';

interface Props {
  department: Department;
  index: number;
}
const DepartmentList = ({ department, index }: Props) => {
  const departmentState = useSelector((state) => state.department);
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
  const initialState: DepartmentFilter = {
    search: '',
    status: '',
    currentPage: 1,
    limit: 20
  };
  const [filter] = useState(initialState);
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
  const handleModalClose = (status: boolean) => {
    setOpenModal(false);
    if (status) {
      dispatch(
        delDepartment({
          id: department.id,
          callback: (resp) => {
            if (resp?.data?.success) {
              dispatch(getDepartmentList(filter));
              Notification('success', 'Delete successfully');
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
            <Typography variant="body2">{index + 20 * (departmentState.currentPage - 1) + 1} </Typography>
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
        <TableCell>{moment(department.created_at).format('DD/MM/YYYY')}</TableCell>
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
