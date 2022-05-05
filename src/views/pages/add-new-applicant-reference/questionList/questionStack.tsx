// THIRD-PARTY
import { Stack, Typography, Box } from '@mui/material';
import React from 'react';

// PROJECT IMPORTS

// TYPE IMPORTS
import { QuestionStackInterface } from 'types/interviewQuestion';
import { QuestionType } from 'types/question';
import QuestionTag from './questionTag';

interface Props {
  questionStack: QuestionStackInterface;
  onClickAddButton?: (type: string) => void;
  onClickDeleteButton?: (type: string, id: number) => void;
  interviewing?: boolean;
}

const QuestionStack = ({ questionStack, interviewing, onClickAddButton, onClickDeleteButton }: Props) => (
  <Box>
    <Stack direction="row" marginBottom={2}>
      <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}>
        {questionStack.language}
      </Typography>
    </Stack>
    <Stack direction="column" spacing={2}>
      {Object.keys(questionStack.questions).map((key: string) =>
        questionStack.questions[key as 'base' | 'advanced' | 'focus'].map((question: QuestionType) => (
          <QuestionTag value={question} key={`${questionStack.language}-${question.id}`} interviewing={interviewing} index={0} />
        ))
      )}
    </Stack>
  </Box>
);

export default React.memo(QuestionStack);
