// THIRD-PARTY
import { Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { activeItem } from 'store/slices/menu';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ApplicantInfo from './applicantInfo';
import FinalResult from './finalResult';
import InterviewQuestion from './interviewQuestion';
import ReferenceResult from './referenceResult';

const DashboardPage = () => {
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

export default DashboardPage;
