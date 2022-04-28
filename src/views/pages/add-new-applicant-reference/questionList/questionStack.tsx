// THIRD-PARTY
import { Stack, Typography, Box } from '@mui/material';
import React from 'react';

// PROJECT IMPORTS
import QuestionTag from './questionTag';
import { useDispatch } from 'store';

// TYPE IMPORTS
import { QuestionStackInterface } from 'types/interviewQuestion';
import { QuestionType } from 'types/question';

interface Props {
  questionStack: QuestionStackInterface;
  onClickAddButton?: (type: string) => void;
  onClickDeleteButton?: (type: string, id: number) => void;
  interviewing?: boolean;
}

const QuestionStack = ({ questionStack, interviewing, onClickAddButton, onClickDeleteButton }: Props) => {
  const dispatch = useDispatch();
  return (
    <Box>
      <Stack direction="row" marginBottom={2}>
        <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}>
          {questionStack.language}
        </Typography>
      </Stack>
      <Stack direction="column" spacing={2}>
        {Object.keys(questionStack.questions).map((key: string) =>
          questionStack.questions[key as 'base' | 'advanced' | 'focus'].map((question: QuestionType) => (
            <QuestionTag value={question} key={`${questionStack.language}-${question.id}`} interviewing={interviewing} />
          ))
        )}
      </Stack>
    </Box>
  );
};

export default React.memo(QuestionStack);
