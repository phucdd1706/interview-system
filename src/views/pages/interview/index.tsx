// THIRD-PARTY
import {
  Box,
  Button,
  TextareaAutosize,
  Stack,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

// PROJECT IMPORTS
import personalDetail from './personalDetailGroup';
import tableColumns from './tableColumns';
import { useSelector } from 'store';
import { axiosPut } from 'utils/helpers/axios';
import { activeItem } from 'store/slices/menu';
import MainCard from 'ui-component/cards/MainCard';
import { handleAnswerStatus, handleInterviewNote, sortDataByKey } from 'store/slices/applicant/applicantReferences';
import { getInterviewDataThunk } from 'store/slices/applicant/applicantAsyncAction';

type personalKey = 'name' | 'email' | 'phone' | 'address' | 'age' | 'time';

interface ChipByTypeProps {
  type: 'base' | 'focus' | 'advanced';
}
const ChipByType = ({ type }: ChipByTypeProps) => {
  switch (type) {
    case 'base':
      return <Chip size="small" label="Base" sx={{ color: 'white', background: '#03a9f4' }} />;
    case 'focus':
      return <Chip size="small" label="Focus" sx={{ color: 'white', background: '#4caf50' }} />;
    case 'advanced':
      return <Chip size="small" label="Advanced" sx={{ background: '#f57f17', color: 'white' }} />;
    default:
      return null;
  }
};

const colorStatus = (status: number) => {
  switch (status) {
    case 2:
      return '#2196f3';
    case 0:
      return 'red';
    case 1:
      return 'green';
    default:
      return '#2196f3';
  }
};

interface InterviewDialogProps {
  handleClose: () => void;
  message: string;
}

const InterviewDialog = ({ handleClose, message }: InterviewDialogProps) => {
  const navigate = useNavigate();
  const handleMessage = (dialogMessage: string) => {
    switch (dialogMessage) {
      case 'fail':
        return (
          <Typography variant="body1" component="p" sx={{ color: '#e53935' }}>
            [Failed]: Knowledge of the applicant is not enough to be selected.
          </Typography>
        );
      case 'pass':
        return (
          <Typography variant="body1" component="p" sx={{ color: '#43a047' }}>
            [Passed]: Knowledge of the applicant is good, enough to be selected.
          </Typography>
        );
      case 'advance':
        return (
          <Typography variant="body1" component="p" sx={{ color: '#43a047' }}>
            [Passed]: Applicant has a solid knowledge and can apply to a higher rank.
          </Typography>
        );
      default:
        return (
          <Typography variant="body1" component="p" color="success">
            {dialogMessage}
          </Typography>
        );
    }
  };
  return (
    <Dialog onClose={handleClose} open={Boolean(message)}>
      <DialogTitle>Reference Evaluate</DialogTitle>
      <Divider />
      <Box sx={{ minWidth: 300, padding: '16px 24px' }}>
        {handleMessage(message)}
        <Box marginTop={6}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              onClick={async () => {
                await handleClose();
                navigate('/history');
              }}
            >
              go to history
            </Button>
          </AnimateButton>
        </Box>
      </Box>
    </Dialog>
  );
};

const Interview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applicantInfo, interviewQuestions } = useSelector((state) => state.applicant);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const handleDialogOpen = (message: string) => setDialogMessage(message);
  const handleDialogClose = () => setDialogMessage('');
  const dispatch = useDispatch();
  useEffect(() => {
    id && dispatch(getInterviewDataThunk(id));
    dispatch(activeItem(['interview']));
  }, [id, dispatch]);
  const getEvaluateValue = (candidate_id: number) => {
    const result = applicantInfo.questions && [...applicantInfo.questions].find((question) => question.question_id === candidate_id);
    return result && result.status;
  };

  const updateEvaluateValue = (candidate_id: number, value: number) => {
    dispatch(handleAnswerStatus({ id: candidate_id, status: value }));
  };

  const sendInterviewResult = async () => {
    await setIsSubmitting(true);
    const data = {
      ...applicantInfo,
      candidateQuestions: applicantInfo.questions,
      status: 1
    };
    await axiosPut(`${process.env.REACT_APP_API_URL}/v1/client/candidates/${id}`, data, 'Complete').then((res: any) => {
      handleDialogOpen(res.message || 'No message');
    });
    setIsSubmitting(false);
  };

  return (
    <MainCard title={`Interview Applicant ${applicantInfo.name}`}>
      {applicantInfo.name ? (
        <>
          <Stack direction="column" spacing={4}>
            {personalDetail.map((group) => (
              <Stack direction="row" key={group.label}>
                {group.render.map((detail) => (
                  <Typography variant="h4" sx={{ width: `calc(100% / ${group.render.length})` }} key={detail.key}>
                    {detail.label}:{' '}
                    <span style={{ fontWeight: 'initial', textTransform: 'capitalize', wordWrap: 'break-word' }}>
                      {detail.key === 'time'
                        ? moment(applicantInfo[detail.key as personalKey]).format('DD/MM/YYYY HH:mm')
                        : applicantInfo[detail.key as personalKey]}
                    </span>
                  </Typography>
                ))}
              </Stack>
            ))}
          </Stack>
          <Divider sx={{ marginTop: 6 }} />
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  {tableColumns.map((column) => (
                    <TableCell
                      key={column.name}
                      sx={column.sx}
                      onClick={() => {
                        column.sort_key &&
                          dispatch(sortDataByKey(column.sort_key as 'type' | 'status' | 'rank_id' | 'language_id' | 'question_content'));
                      }}
                    >
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {interviewQuestions.map((question) =>
                  Object.keys(question.questions).map((key) =>
                    question.questions[key as 'base' | 'advanced' | 'focus'].map((item, itemIndex) => (
                      <TableRow
                        key={item.candidate_id}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#f6f6f6'
                          }
                        }}
                      >
                        <TableCell align="center">{itemIndex + 1}</TableCell>
                        <TableCell sx={{ maxWidth: '350px', overflow: 'hidden', wordBreak: 'break-word' }}>
                          {item.question_content}
                        </TableCell>
                        <TableCell>{(item.language && item.language.name) || ''}</TableCell>
                        <TableCell>{(item.rank && item.rank.name) || ''}</TableCell>
                        <TableCell sx={{ color: item.type ? 'red' : '#2196f3' }}>
                          <ChipByType type={item.type as 'base' | 'focus' | 'advanced'} />
                        </TableCell>
                        <TableCell>
                          <Select
                            fullWidth
                            labelId="demo-simple-select-standard-label"
                            value={getEvaluateValue(item.candidate_id || 2)}
                            sx={{
                              '& .MuiSelect-standard': {
                                color: colorStatus(Number(getEvaluateValue(item.candidate_id || 2)))
                              }
                            }}
                            id="demo-simple-select-standard"
                            label="Age"
                            variant="standard"
                            onChange={(e) => updateEvaluateValue(item.candidate_id || 0, Number(e.target.value))}
                          >
                            <MenuItem value={0} sx={{ color: 'red' }}>
                              Fail
                            </MenuItem>
                            <MenuItem value={1} sx={{ color: 'green' }}>
                              Pass
                            </MenuItem>
                            <MenuItem value={2} sx={{ color: '#2196f3' }}>
                              Skip
                            </MenuItem>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )
                )}
              </TableBody>
            </Table>
          </Box>
          <Box marginTop={6}>
            <TextareaAutosize
              name="note"
              onChange={(e) => dispatch(handleInterviewNote(e.target.value))}
              value={applicantInfo.note}
              aria-label="minimum height"
              minRows={3}
              placeholder="Note"
              style={{ width: '100%', minHeight: '24px', padding: '8px', fontFamily: 'roboto', fontSize: '14px', resize: 'vertical' }}
            />
          </Box>
          <Box marginTop={6}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting}
                onClick={sendInterviewResult}
                fullWidth
                size="large"
                variant="contained"
                color="primary"
              >
                Send Result
              </Button>
            </AnimateButton>
          </Box>
          {dialogMessage && <InterviewDialog message={dialogMessage} handleClose={handleDialogClose} />}
        </>
      ) : (
        <Typography variant="h4">No data</Typography>
      )}
    </MainCard>
  );
};

export default Interview;
