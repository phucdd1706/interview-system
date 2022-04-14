// THIRD-PARTY
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Button,
  Box,
  Popover,
  Typography,
  Chip,
  IconButton
} from '@mui/material';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

// PROJECT IMPORTS
import { RootState } from 'store/index';
import { Candidates } from 'types/complete';
import { fetchCandidates } from 'store/slices/inProgress';
import CandidateDrawer from 'components/DrawerPage/CandidateDrawer';
import CandidateModal from 'components/ModalPage/CandidateModal';

interface Iprops {
  visibleCreate: boolean;
}

const InProgressList = ({ visibleCreate }: Iprops) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const token = localStorage.getItem('serviceToken');
  const inProgress = useSelector((state: RootState) => state.inProgress);
  const [candidate, setCandidate] = useState<Candidates[]>(inProgress.data.list);

  const [checkFirst, setCheckFirst] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [idRecord, setIdRecord] = useState(0);

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (!visibleCreate && checkFirst) {
      setCheckFirst(false);
    } else {
      setVisibleAdd(!visibleAdd);
      setDataEdit({});
    }
  }, [visibleCreate]);

  useEffect(() => {
    setCandidate(inProgress.data.list);
  }, [inProgress.data.list]);

  const getList = () => {
    const params = {};

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
    setIdRecord(0);
  };

  const deleteRecord = () => {
    console.log('idRecord', idRecord);
    handleClose();
  };

  const pagination = {
    current: 1,
    pageSize: 10
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
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
            {candidate?.map((row, index) => (
              <TableRow hover key={row?.id}>
                <TableCell>{index + (pagination.current - 1) * pagination.pageSize + 1}</TableCell>
                <TableCell>{row?.name}</TableCell>
                <TableCell>{row?.phone}</TableCell>
                <TableCell>{row?.email}</TableCell>
                <TableCell>{moment(row.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
                <TableCell>
                  {row.status === 1 && (
                    <Chip
                      label="Inactive"
                      size="small"
                      sx={{
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                        color: theme.palette.warning.dark
                      }}
                    />
                  )}
                  {row.status === 2 && (
                    <Chip
                      label="Active"
                      size="small"
                      sx={{
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
                        color: theme.palette.success.dark
                      }}
                    />
                  )}
                  {row.status === 3 && (
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
                <TableCell align="center" sx={{ pr: 3 }}>
                  <IconButton
                    color="primary"
                    size="large"
                    onClick={() => {
                      setDataEdit(row);
                      setVisibleModal(!visibleModal);
                    }}
                  >
                    <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    size="large"
                    onClick={() => {
                      setDataEdit(row);
                      setVisibleAdd(!visibleAdd);
                    }}
                  >
                    <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                  </IconButton>
                  <span>
                    <IconButton
                      color="error"
                      size="large"
                      onClick={(e) => {
                        handleClick(e);
                        setIdRecord(row.id);
                      }}
                    >
                      <DeleteTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </IconButton>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                      }}
                    >
                      <Typography sx={{ p: 1.5 }}>Bạn có chắc chắn muốn xóa?</Typography>
                      <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
                        <Button size="small" variant="outlined" onClick={handleClose}>
                          Hủy
                        </Button>
                        <Button size="small" color="error" variant="outlined" onClick={() => deleteRecord()}>
                          Xóa
                        </Button>
                      </Box>
                    </Popover>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CandidateDrawer visible={visibleAdd} dataEdit={dataEdit} />
      <CandidateModal visible={visibleModal} dataEdit={dataEdit} />
    </>
  );
};

export default InProgressList;
