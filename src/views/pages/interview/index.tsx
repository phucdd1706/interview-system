// THIRD-PARTY
import { useEffect } from 'react';
import { Box, Button, Stack, Divider } from '@mui/material';
import { useIntl } from 'react-intl';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ApplicantInformation from './applicantInfo';
import InterviewerResult from './interviewerResult';
import InterviewQuestions from './interviewQuestions';
import ReferenceResult from './referenceResult';
import { useSelector, useDispatch } from 'store';
import { getReferenceEvaluateThunk, applicantReferenceInit } from 'store/slices/applicant/applicantAsyncAction';
import { ApplicantDataInterface } from 'types/applicantData';
import { useParams } from 'react-router-dom';

const InterviewPage = () => {
  const applicantReferences: ApplicantDataInterface = useSelector((state) => state.applicant);
  const dispatch = useDispatch();
  const intl = useIntl();
  const { applicantId } = useParams();

  useEffect(() => {
    applicantId && dispatch(applicantReferenceInit(applicantId));
  }, [dispatch]);

  const getReferenceEvaluate = async () => {
    dispatch(getReferenceEvaluateThunk(applicantReferences));
  };
  return (
    <Stack direction="column" spacing={2}>
      <MainCard title={intl.formatMessage({ id: 'applicant information' })}>
        <ApplicantInformation applicantInfo={applicantReferences.applicantInfo} />
      </MainCard>
      <MainCard title={intl.formatMessage({ id: 'interview questions' })}>
        {applicantReferences.interviewQuestions.length > 0 && (
          <>
            <InterviewQuestions interviewQuestions={applicantReferences.interviewQuestions} />
            <Box margin="2em 0">
              <Divider />
            </Box>
            <Box>
              <AnimateButton>
                <Button
                  disableElevation
                  onClick={getReferenceEvaluate}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Send Interview Result
                </Button>
              </AnimateButton>
            </Box>
          </>
        )}
      </MainCard>
      {applicantReferences.referenceEvaluate && (
        <>
          <MainCard title={intl.formatMessage({ id: 'reference results' })} sx={{ margin: '1em 0' }}>
            <ReferenceResult result={applicantReferences.referenceEvaluate} />
          </MainCard>
          <MainCard title={intl.formatMessage({ id: 'interviewer results' })} sx={{ margin: '1em 0' }}>
            <InterviewerResult />
          </MainCard>
        </>
      )}
    </Stack>
  );
};

export default InterviewPage;
