// THIRD-PARTY
import React, { useState } from 'react';

// PROJECT IMPORTS
import { ButtonBase, Chip, IconButton, Link, Menu, MenuItem, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { QuestionType } from 'types/question';

interface Props {
  question: QuestionType;
  index: number;
}

const Question = ({ question, index }: Props) => {
  const theme = useTheme();
  const [openQuestionDrawer, setOpenQuestionDrawer] = useState<boolean>(false);
  const handleQuestionDrawerOpen = () => {
    setOpenQuestionDrawer((prevState) => !prevState);
  };

  const editQuestion = () => {
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
  // const handleModalClose = (status: boolean) => {
  //   setOpenModal(false);
  //   if (status) {
  //     dispatch(DeleteQuestion(question));
  //     dispatch(
  //       openSnackbar({
  //         open: true,
  //         message: 'Deleted successfully!',
  //         anchorOrigin: { vertical: 'top', horizontal: 'right' },
  //         variant: 'alert',
  //         alert: {
  //           color: 'success'
  //         },
  //         close: true
  //       })
  //     );
  //   }
  // };

  return (
    <>
      <TableRow hover key={index}>
        <TableCell sx={{ width: 110, minWidth: 110 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2">{question.id}</Typography>
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
            {question.rankId}
          </Link>
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
            {question.departmentId}
          </Link>
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
            {question.languageId}
          </Link>
        </TableCell>
        <TableCell sx={{ width: 410, minWidth: 110, maxWidth: 'calc(100vw - 850px)' }} component="th" scope="row">
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
            {question.questionContent}
          </Link>
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
                // editRank();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                // setOpenModal(true);
              }}
            >
              Delete
            </MenuItem>
          </Menu>
          {/* {openModal && <AlertRankDelete name={rank.name} open={openModal} handleClose={handleModalClose} />} */}
        </TableCell>
      </TableRow>
      {/* <EditRank rank={rank} open={openRankDrawer} handleDrawerOpen={handleRankDrawerOpen} /> */}
    </>
  );
};
export default Question;
