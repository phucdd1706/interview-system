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
    <Stack direction="column" spacing={2}>
      {Object.keys(questionStack.questions).map((key: string) => (
        <Box key={`${questionStack.language}-${key}`}>
          {!interviewing && (
            <Typography variant="h5" component="h5" sx={{ flexGrow: 1, padding: '8px 0' }}>
              {key.toUpperCase()}
            </Typography>
          )}
          <Stack direction="column" spacing={1}>
            {questionStack.questions[key as 'base' | 'advanced' | 'focus'].map((question: QuestionType) => (
              <QuestionTag value={question} key={`${questionStack.language}-${question.id}-${key}`} interviewing={interviewing} index={0} />
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  </Box>
);

export default React.memo(QuestionStack);
