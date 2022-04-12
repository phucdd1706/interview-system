// THIRD-PARTY
import { Box, Button, Stack, Divider } from '@mui/material';
// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ApplicantInfo from './applicantInfo';
import InterviewerResult from './interviewerResult';
import InterviewQuestions from './interviewQuestions';
import ReferenceResult from './referenceResult';
import { useSelector, useDispatch } from 'store';
import { getReferenceEvaluate } from 'store/slices/applicantReferences';

const InterviewPage = () => {
  const applicantReferences = useSelector((state) => state.applicant);
  const dispatch = useDispatch();
  const GetReferenceEvaluate = async () => {
    dispatch(getReferenceEvaluate(applicantReferences));
  };
  return (
    <Stack direction="column" spacing={2}>
      <MainCard title="Interview">
        <ApplicantInfo />
      </MainCard>
      <MainCard title="Interview Question">
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
                  onClick={GetReferenceEvaluate}
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
          <MainCard title="Reference Result" sx={{ margin: '1em 0' }}>
            <ReferenceResult />
          </MainCard>
          <MainCard title="Interviewer Result" sx={{ margin: '1em 0' }}>
            <InterviewerResult />
          </MainCard>
        </>
      )}
    </Stack>
  );
};

export default InterviewPage;
