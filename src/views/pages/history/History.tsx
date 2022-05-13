// THIRD-PARTY
import React, { useState } from 'react';
import { ButtonBase, TableCell, TableRow, Chip, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { CancelTwoTone } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

// PROJECT IMPORTS
import AddHistory from 'views/pages/history/AddHistory';
import { RootState, useSelector } from 'store';
import { Candidates } from 'types/history';
import QuestionModal from 'views/pages/history/Interview/QuestionModal';
import { Link } from 'react-router-dom';
import { editCandidate } from 'store/slices/history';

interface Props {
  history: Candidates;
  index: number;
  getList: () => void;
}

const History = ({ history, index, getList }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleQuestionModal, setVisibleQuestionModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const historyState = useSelector((state: RootState) => state.history);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            setVisibleQuestionModal(!visibleQuestionModal);
          }}
        >
          <Link to={`/interview/${history?.id}`} style={{ textDecoration: 'none', color: '#616161' }}>
            <EventAvailableIcon
              fontSize="small"
              sx={{ color: history?.status ? '#00C853' : '#ffc107', mr: 1, position: 'relative', top: 5 }}
            />
            {history?.status ? 'Edit Result' : 'Interview'}
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setVisibleAdd(!visibleAdd);
          }}
        >
          <EditIcon fontSize="small" sx={{ color: '#2196f3', mr: 1 }} />
          Edit
        </MenuItem>
      </Menu>
    </>
  );

  const handleVisibleModal = () => {
    setVisibleAdd((prevState) => !prevState);
  };

  const handleVisibleQuestionModal = () => {
    setVisibleQuestionModal((prevState) => !prevState);
  };

  const renderStatus = (status: number) => (
    <>
      {status === 0 && (
        <Chip
          label="InProgress"
          size="small"
          sx={{
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
            color: theme.palette.warning.dark
          }}
        />
      )}
      {status === 1 && (
        <Chip
          label="Complete"
          size="small"
          sx={{
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
            color: theme.palette.success.dark
          }}
        />
      )}
      {status === 2 && (
        <Chip
          label="Canceled"
          size="small"
          sx={{
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.error.light + 60,
            color: theme.palette.error.dark
          }}
        />
      )}
    </>
  );

  return (
    <>
      <TableRow hover key={history?.id}>
        <TableCell sx={{ width: '5%' }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2">{index + 20 * (historyState?.currentPage - 1) + 1}</Typography>
          </Stack>
        </TableCell>
        <TableCell component="th" scope="row">
          {history.name}
        </TableCell>
        <TableCell sx={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{history?.email}</TableCell>
        <TableCell>{history?.age}</TableCell>
        <TableCell>{moment(history?.time).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>{moment(history?.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>{moment(history?.updated_at).format('DD/MM/YYYY HH:mm')}</TableCell>
        <TableCell>{renderStatus(history?.status)}</TableCell>
        <TableCell align="center">{renderMenuButton()}</TableCell>
      </TableRow>
      <AddHistory visible={visibleAdd} dataEdit={history} handleVisibleModal={handleVisibleModal} getList={() => getList()} />
    </>
  );
};

export default History;
