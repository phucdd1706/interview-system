// THIRD-PARTY
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// PROJECT IMPORTS
import { ButtonBase, Chip, IconButton, Link, Menu, MenuItem, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { dispatch, RootState, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { QuestionFilter, QuestionType } from 'types/question';
import { DeleteQuestion, getQuestionsList } from 'store/slices/question';
import AlertQuestionDelete from './AlertQuestionDelete';
import EditQuestion from './EditQuestion';
import moment from 'moment';

interface Props {
  question: QuestionType;
  index: number;
}

const Question = ({ question, index }: Props) => {
  const initialState: QuestionFilter = {
    search: '',
    status: '',
    rank_id: '',
    department_id: '',
    language_id: '',
    currentPage: 1
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
  const questionState = useSelector((state: RootState) => state.question);
  const theme = useTheme();
  const [openQuestionDrawer, setOpenQuestionDrawer] = useState<boolean>(false);
  const [edit, setEdit] = useState(false);
  const handleQuestionDrawerOpen = () => {
    setOpenQuestionDrawer((prevState) => !prevState);
  };

  const editQuestion = async () => {
    await setEdit(true);
    setOpenQuestionDrawer((prevState) => !prevState);
  };

  const openPropertyModal = async () => {
    await setEdit(false);
    setOpenQuestionDrawer((prevState) => !prevState);
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
      dispatch(
        DeleteQuestion({
          id: question.id,
          callback: (response) => {
            if (response?.data?.success) {
              dispatch(getQuestionsList(filter));
              Notification('success', 'Delete successfully');
            } else {
              Notification('error', response?.message);
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
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography alignItems="center" variant="body2" style={{ marginLeft: '15px' }}>
              {20 * (questionState.currentPage - 1) + index + 1}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ maxWidth: 400 }} component="th" scope="row">
          <Link
            underline="hover"
            color="default"
            sx={{
              overflow: 'hidden',
              display: 'block',
              textOverflow: 'ellipsis',
              whiteSpace: 'break-word',
              ':hover': { color: 'primary.main' },
              cursor: 'pointer'
            }}
            onClick={openPropertyModal}
          >
            {question.question_content}
          </Link>
        </TableCell>
        <TableCell sx={{ width: 110, minWidth: 110, maxWidth: 'calc(100vw - 850px)' }} component="th" scope="row">
          {question.rank?.name}
        </TableCell>
        <TableCell sx={{ width: 110, minWidth: 110, maxWidth: 'calc(100vw - 850px)' }} component="th" scope="row">
          {question.department?.name}
        </TableCell>
        <TableCell sx={{ width: 110, minWidth: 110, maxWidth: 'calc(100vw - 850px)' }} component="th" scope="row">
          {question.language?.name}
        </TableCell>
        <TableCell sx={{ width: 110, minWidth: 110, maxWidth: 'calc(100vw - 850px)' }} component="th" scope="row">
          {question.type === 0 && 'Basic'}
          {question.type === 1 && 'Focus'}
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(question.updated_at).format('DD/MM/yy hh:mm')}
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(question.updated_at).format('DD/MM/yy hh:mm')}
        </TableCell>
        <TableCell>
          {question.status === 0 && (
            <Chip
              label="Inactive"
              size="small"
              sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                color: theme.palette.warning.dark
              }}
            />
          )}
          {question.status === 1 && (
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
                editQuestion();
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
          {openModal && <AlertQuestionDelete open={openModal} handleClose={handleModalClose} indexId={index} />}
        </TableCell>
      </TableRow>
      {openQuestionDrawer && (
        <EditQuestion
          question={question}
          edit={edit}
          open={openQuestionDrawer}
          handleDrawerOpen={handleQuestionDrawerOpen}
          indexId={index}
        />
      )}
    </>
  );
};
export default Question;
