import React, { useState } from 'react';

// THIRD-PARTY
import { useTheme } from '@mui/material/styles';
import { ButtonBase, Chip, IconButton, Link, Menu, MenuItem, Stack, TableCell, TableRow, Typography } from '@mui/material';

import moment from 'moment';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

// PROJECT IMPORTS
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { delDepartment, getDepartmentList } from 'store/slices/department';

import EditDepartment from './EditDepartment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDepartmentDelete from './AlertDepartmentDelete';
import { Department, DepartmentFilter } from 'types/department';

interface Props {
  department: Department;
  index: number;
}
const initialState: DepartmentFilter = {
  search: '',
  status: '',
  currentPage: 1,
  limit: 20
};

const DepartmentList = ({ department, index }: Props) => {
  const theme = useTheme();
  const departmentState = useSelector((state) => state.department);

  const [openModal, setOpenModal] = useState(false);
  const [filter] = useState(initialState);
  const [openDepartmentDrawer, setOpenDepartmentDrawer] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleDepartmentDrawerOpen = () => {
    setOpenDepartmentDrawer((prevState) => !prevState);
  };

  const editDepartment = () => {
    setOpenDepartmentDrawer((prevState) => !prevState);
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
        <TableCell>{moment(department.update_at).format('DD/MM/YYYY')}</TableCell>
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
              <EditIcon fontSize="small" sx={{ color: '#3f50b5', mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setOpenModal(true);
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: '#ff1744', mr: 1 }} />
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
