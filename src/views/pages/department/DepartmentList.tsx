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

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Department, DepartmentFilter } from 'types/department';
import AlertDelete from 'ui-component/Alert/AlertDelete';
import AddDepartment from './AddDepartment';

interface Props {
  department: Department;
  index: number;
  departFilter: DepartmentFilter;
}

const DepartmentList = ({ department, index, departFilter }: Props) => {
  const theme = useTheme();
  const departmentState = useSelector((state) => state.department);

  const [openModal, setOpenModal] = useState(false);
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
              dispatch(getDepartmentList(departFilter));
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
        <TableCell sx={{ width: '5%', pl: 3 }}>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">{index + 20 * (departmentState.currentPage - 1) + 1} </Typography>
          </Stack>
        </TableCell>
        <TableCell component="th" scope="row">
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
        <TableCell>{moment(department.created_at).format('DD/MM/yy hh:mm')}</TableCell>
        <TableCell>{moment(department.updated_at).format('DD/MM/yy hh:mm')}</TableCell>
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
                editDepartment();
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
          {openModal && <AlertDelete name={department.name} open={openModal} handleClose={handleModalClose} />}
        </TableCell>
      </TableRow>
      <AddDepartment
        department={department}
        open={openDepartmentDrawer}
        handleDrawerOpen={handleDepartmentDrawerOpen}
        departFilter={departFilter}
      />
    </>
  );
};

export default DepartmentList;
