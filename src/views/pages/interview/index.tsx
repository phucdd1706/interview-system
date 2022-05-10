import {
  Box,
  Button,
  TextareaAutosize,
  Stack,
  Typography,
  Divider,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Select,
  MenuItem
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'store';
import { getInterviewDataThunk } from 'store/slices/applicant/applicantAsyncAction';
import { handleAnswerStatus, handleInterviewNote, sortDataByKey } from 'store/slices/applicant/applicantReferences';
import { activeItem } from 'store/slices/menu';
import MainCard from 'ui-component/cards/MainCard';
import personalDetail from './personalDetailGroup';
import { axiosPut } from 'utils/helpers/axios';

type personalKey = 'name' | 'email' | 'phone' | 'address' | 'age' | 'time';

const Interview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applicantInfo, interviewQuestions } = useSelector((state) => state.applicant);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    id && dispatch(getInterviewDataThunk(id));
    dispatch(activeItem(['interview']));
  }, [id]);

  const getEvaluateValue = (candidate_id: number) => {
    const result = applicantInfo.questions && [...applicantInfo.questions].find((question) => question.question_id === candidate_id);
    return result && result.status;
  };

  const updateEvaluateValue = (candidate_id: number, value: number) => {
    dispatch(handleAnswerStatus({ id: candidate_id, status: value }));
  };

  const colorStatus = (status: number) => {
    switch (status) {
      case 0:
        return '#2196f3';
      case 1:
        return 'red';
      case 2:
        return 'green';
      default:
        return '#2196f3';
    }
  };

  const sendInterviewResult = async () => {
    await setIsSubmitting(true);
    const data = {
      ...applicantInfo,
      candidateQuestions: applicantInfo.questions,
      status: 1
    };
    await axiosPut(`${process.env.REACT_APP_API_URL}/v1/client/candidates/${id}`, data, 'Complete').then(() => navigate('/history'));
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
                    <span style={{ fontWeight: 'initial', textTransform: 'capitalize' }}>{applicantInfo[detail.key as personalKey]}</span>
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
                  <TableCell
                    sx={{
                      width: '50px'
                    }}
                  >
                    STT
                  </TableCell>
                  <TableCell
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        background: '#f6f6f6'
                      }
                    }}
                    onClick={() => {
                      dispatch(sortDataByKey('question_content'));
                    }}
                  >
                    Question
                  </TableCell>
                  <TableCell
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        background: '#f6f6f6'
                      }
                    }}
                    onClick={() => {
                      dispatch(sortDataByKey('language_id'));
                    }}
                  >
                    Language
                  </TableCell>
                  <TableCell
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        background: '#f6f6f6'
                      }
                    }}
                    onClick={() => {
                      dispatch(sortDataByKey('rank_id'));
                    }}
                  >
                    Rank
                  </TableCell>
                  <TableCell
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        background: '#f6f6f6'
                      }
                    }}
                    onClick={() => {
                      dispatch(sortDataByKey('type'));
                    }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    sx={{
                      width: '100px',
                      cursor: 'pointer',
                      '&:hover': {
                        background: '#f6f6f6'
                      }
                    }}
                    onClick={() => {
                      dispatch(sortDataByKey('status'));
                    }}
                  >
                    Evaluate
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {interviewQuestions.map((question, index) =>
                  question.questions.base.map((base, baseIndex) => (
                    <TableRow
                      key={base.candidate_id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#f6f6f6'
                        }
                      }}
                    >
                      <TableCell align="center">{baseIndex + 1}</TableCell>
                      <TableCell sx={{ maxWidth: '350px', overflow: 'hidden', wordBreak: 'break-word' }}>{base.question_content}</TableCell>
                      <TableCell>{(base.language && base.language.name) || ''}</TableCell>
                      <TableCell>{(base.rank && base.rank.name) || ''}</TableCell>
                      <TableCell sx={{ color: base.type ? 'red' : '#2196f3' }}>{base.type ? 'Advanced' : 'Basic'}</TableCell>
                      <TableCell>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-standard-label"
                          value={getEvaluateValue(base.candidate_id || 0) || 0}
                          sx={{
                            '& .MuiSelect-standard': {
                              color: colorStatus(Number(getEvaluateValue(base.candidate_id || 0)) || 0)
                            }
                          }}
                          id="demo-simple-select-standard"
                          label="Age"
                          variant="standard"
                          onChange={(e) => updateEvaluateValue(base.candidate_id || 0, Number(e.target.value))}
                        >
                          <MenuItem value={0}>Skip</MenuItem>
                          <MenuItem value={1} sx={{ color: 'red' }}>
                            Bad
                          </MenuItem>
                          <MenuItem value={2} sx={{ color: 'green' }}>
                            Good
                          </MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
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
        </>
      ) : (
        <Typography variant="h4">No data</Typography>
      )}
    </MainCard>
  );
};

export default Interview;
