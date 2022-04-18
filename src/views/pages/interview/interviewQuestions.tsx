// THIRD-PARTY
import { Stack } from '@mui/material';
import { QuestionStackInterface } from 'types/interviewQuestion';

// PROJECT IMPORTS
import QuestionStack from 'views/pages/add-new-applicant-reference/questionList/questionStack';

interface Props {
  interviewQuestions: QuestionStackInterface[];
}

const InterviewQuestions = ({ interviewQuestions }: Props) => (
  <Stack direction="column" spacing={2}>
    {interviewQuestions.map((type) => (
      <QuestionStack questionStack={type} key={type.type} interviewing />
    ))}
  </Stack>
);

export default InterviewQuestions;
