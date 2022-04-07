// THIRD-PARTY
import { Stack } from '@mui/material';
import { useSelector } from 'store';

// PROJECT IMPORTS
import QuestionStack from 'views/add-new-applicant-reference/questionList/questionStack';

const InterviewQuestions = () => {
  const { interviewQuestions } = useSelector((state) => state.applicant);

  return (
    <Stack direction="column" spacing={2}>
      {interviewQuestions.map((type) => (
        <QuestionStack questionStack={type} key={type.type} interviewing />
      ))}
    </Stack>
  );
};

export default InterviewQuestions;
