// THIRD PARTY
import React, { useState, useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  Button,
  Stack,
  DialogContent,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  Dialog,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import Profile from 'assets/images/logo/profile.jpg';
// import ProfileFemale from 'assets/images/logo/profile-female.jpg';

// PROJECT IMPORT
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Candidates, Question } from 'types/history';
import QuestionTag from 'views/pages/history/QuestionTag';
import { QuestionType } from 'types/question';
import { gridSpacing } from 'store/constant';
import { editCandidate } from 'store/slices/history';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

interface Props {
  dataCandidate: Candidates;
  visible: boolean;
  handleVisibleQuestionModal: () => void;
}

const QuestionModal = ({ dataCandidate, visible, handleVisibleQuestionModal }: Props) => {
  const theme = useTheme();
  const [questionList, setQuestionList] = useState<QuestionType[]>();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const dataQuestion = dataCandidate?.candidate_question?.map((item: Question) => ({
      candidate_id: item?.candidate_id,
      question_content: item?.question?.question_content,
      type: item?.question?.type,
      status: item?.status,
      id: item?.id,
      rankName: item?.question?.rank?.name,
      languageName: item?.question?.language?.name
    }));
    dataQuestion.sort((a: QuestionType, b: QuestionType) => (a.type !== b.type ? 1 : -1));
    setQuestionList(dataQuestion);
  }, [dataCandidate]);

  const handleStatusQuestion = (questionId: number | undefined, status: number | string) => {
    setQuestionList(questionList?.map((item) => (item.id !== questionId ? item : { ...item, status })));
  };

  const handleInterviewResult = () => {
    const candidateQuestions = questionList?.map((item) => ({ question_id: item?.id, status: item?.status }));
    const finalInterview = {
      candidateQuestions,
      name: dataCandidate?.name,
      email: dataCandidate?.email,
      time: dataCandidate?.time,
      age: dataCandidate?.age,
      phone: dataCandidate?.phone,
      address: dataCandidate?.address,
      status: 1
    };
    dispatch(
      editCandidate({
        id: dataCandidate?.id,
        params: finalInterview,
        callback: (res) => {
          if (res?.data?.success) {
            openNotification('success', `Interview ${dataCandidate?.name} successfully!`);
            changeModal('close');
          } else {
            openNotification('error', res?.message);
          }
        }
      })
    );
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

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleVisibleQuestionModal();
    }
  };

  return (
    <Dialog
      open={visible}
      onClose={() => {
        changeModal('close');
      }}
      fullScreen
      sx={{
        '&>div:nth-of-type(3)': {
          '&>div': {
            m: 0,
            borderRadius: '0px',
            width: '100%',
            maxHeight: '100%'
          }
        }
      }}
    >
      {visible && (
        <>
          <Box sx={{ p: 3 }}>
            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography
                    variant={matchDownSM ? 'h4' : 'h3'}
                    sx={{
                      display: 'inline-block',
                      width: 'calc(100% - 34px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      verticalAlign: 'middle'
                    }}
                  >
                    {`Interview candidate ${dataCandidate?.name}`}
                  </Typography>
                  <Button variant="text" color="error" sx={{ p: 0.5, minWidth: 32, display: 'block' }} onClick={() => changeModal('close')}>
                    <HighlightOffIcon />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <DialogContent>
            <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
              {!matchDownSM && (
                <Grid item xs={2}>
                  <Box sx={{ border: '1px solid #000', m: 1, width: '80%', height: '100%' }}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={Profile} alt="profile" />
                  </Box>
                </Grid>
              )}
              <Grid item xs={12} md={10}>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={5} xl={2}>
                    <Typography variant="h4">Name:</Typography>
                  </Grid>
                  <Grid item xs={7} xl={4}>
                    {dataCandidate?.name}
                  </Grid>
                  <Grid item xs={5} xl={2}>
                    <Typography variant="h4">Age:</Typography>
                  </Grid>
                  <Grid item xs={7} xl={4}>
                    {dataCandidate?.age}
                  </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={5} xl={2}>
                    <Typography variant="h4">Email:</Typography>
                  </Grid>
                  <Grid item xs={7} xl={4}>
                    {dataCandidate?.email}
                  </Grid>
                  <Grid item xs={5} xl={2}>
                    <Typography variant="h4">Phone:</Typography>
                  </Grid>
                  <Grid item xs={7} xl={4}>
                    {dataCandidate?.phone}
                  </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={5} xl={2}>
                    <Typography variant="h4">Interview Time:</Typography>
                  </Grid>
                  <Grid item xs={7} xl={10}>
                    {moment(dataCandidate?.time).format('DD/MM/YYYY HH:mm')}
                  </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={5} xl={2}>
                    <Typography variant="h4">Address:</Typography>
                  </Grid>
                  <Grid item xs={7} xl={10}>
                    {dataCandidate?.address}
                  </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={5} xl={2}>
                    <Typography variant="h4">Note:</Typography>
                  </Grid>
                  <Grid item xs={7} xl={10}>
                    {dataCandidate?.note}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
              <Grid item xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ pr: 3, width: '5%' }}>STT</TableCell>
                        <TableCell sx={{ width: '40%' }}>Question Content</TableCell>
                        <TableCell sx={{ width: '15%' }}>Rank</TableCell>
                        <TableCell sx={{ width: '15%' }}>Language</TableCell>
                        <TableCell sx={{ width: '15%' }}>Type</TableCell>
                        <TableCell sx={{ width: '10%' }} align="right">
                          Evaluate
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ '& th,& td': { whiteSpace: 'nowrap' } }}>
                      {questionList?.map((question, index) => (
                        <QuestionTag
                          index={index}
                          value={question}
                          key={`${question?.id}_${index}`}
                          handleStatusQuestion={handleStatusQuestion}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12}>
                <AnimateButton>
                  <Button fullWidth variant="contained" onClick={() => handleInterviewResult()}>
                    Final Interview
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default QuestionModal;
