// THIRD-PARTY
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonBase,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Chip,
  IconButton,
  Pagination,
  Grid,
  Menu,
  MenuItem
} from '@mui/material';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

// PROJECT IMPORTS
import { RootState } from 'store/index';
import { Candidates } from 'types/complete';
import { fetchCandidates, removeCandidate } from 'store/slices/complete';
import AddComplete from 'views/pages/complete/AddComplete';
import { gridSpacing } from '../../../store/constant';
import AlertCompleteDelete from 'views/pages/complete/AlertCompleteDelete';
import { openSnackbar } from 'store/slices/snackbar';

const CompleteList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const token = localStorage.getItem('serviceToken');
  const complete = useSelector((state: RootState) => state.complete);

  const [candidate, setCandidate] = useState<Candidates[]>(complete.data.list);
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    setCandidate(complete.data.list);
  }, [complete]);

  const getList = () => {
    const filterRedux = complete.filter;
    const params = filterRedux;

    dispatch(
      fetchCandidates({
        params,
        token
      })
    );
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalClose = (status: boolean) => {
    setOpenModal(false);
    if (status) {
      dispatch(removeCandidate({ id: dataEdit.id, token }));
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

  const handleTableChange = (e: any, pageTable: number) => {
    console.log('pageTable', pageTable);
  };

  const renderStatus = (status: number) => (
    <>
      {status === 1 && (
        <Chip
          label="Inactive"
          size="small"
          sx={{
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
            color: theme.palette.warning.dark
          }}
        />
      )}
      {status === 2 && (
        <Chip
          label="Active"
          size="small"
          sx={{
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
            color: theme.palette.success.dark
          }}
        />
      )}
      {status === 3 && (
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidate?.map((row) => (
              <TableRow hover key={row?.id}>
                <TableCell>{row?.id}</TableCell>
                <TableCell>{row?.name}</TableCell>
                <TableCell>{row?.phone}</TableCell>
                <TableCell>{row?.email}</TableCell>
                <TableCell>{moment(row.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
                <TableCell>{renderStatus(row.status)}</TableCell>

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
                        setDataEdit(row);
                        setVisibleAdd(!visibleAdd);
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleClose();
                        setDataEdit(row);
                        setOpenModal(true);
                      }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item xs={12} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" spacing={gridSpacing}>
          <Grid item>
            <Pagination count={10} color="primary" onChange={handleTableChange} />
          </Grid>
        </Grid>
      </Grid>

      {openModal && <AlertCompleteDelete name={dataEdit?.name} open={openModal} handleClose={handleModalClose} />}

      <AddComplete visible={visibleAdd} dataEdit={dataEdit} getList={getList} />
    </>
  );
};

export default CompleteList;
