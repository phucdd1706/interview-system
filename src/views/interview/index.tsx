// THIRD-PARTY
import { Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ApplicantInfo from './applicantInfo';
import FinalResult from './finalResult';
import InterviewQuestion from './interviewQuestion';
import ReferenceResult from './referenceResult';

const state = {
  applicantId: '',
  questionAnswered: [
    {
      questionId: '',
      evaluate: '',
      notes: ''
    },
    {
      questionId: '',
      evaluate: '',
      notes: ''
    }
  ],
  interviewReferenceResult: {
    passedQuestion: '10/12',
    failedQuestion: '2',
    score: '80%',
    result: 'Passed',
    salary: '10,000,000'
  },
  interviewerResult: {
    passed: true,
    salary: '10000000',
    notes: ''
  }
};

const InterviewPage = () => {
  const dispatch = useDispatch();

  return (
    <Stack direction="column" spacing={2}>
      <MainCard title="Interview">
        <ApplicantInfo />
      </MainCard>
      <MainCard title="Interview Question">
        <InterviewQuestion />
      </MainCard>
      <MainCard sx={{ margin: '1em 0' }}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
            Send Interview Result
          </Button>
        </AnimateButton>
      </MainCard>
      <MainCard title="Reference Result" sx={{ margin: '1em 0' }}>
        <ReferenceResult />
      </MainCard>
      <MainCard title="Interviewer Result" sx={{ margin: '1em 0' }}>
        <FinalResult />
      </MainCard>
      <MainCard sx={{ margin: '1em 0' }}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </AnimateButton>
      </MainCard>
    </Stack>
  );
};

export default InterviewPage;
