// THIRD-PARTY
import { Stack, Typography, Box } from '@mui/material';
import { IconPlus } from '@tabler/icons';
import React from 'react';

// PROJECT IMPORTS
import QuestionTag from './questionTag';

// TYPE IMPORTS
import { QuestionStackInterface } from 'types/interviewQuestion';
import ButtonRounded from '../buttonRounded';

interface Props {
  questionStack: QuestionStackInterface;
  onClickAddButton?: (type: string) => void;
  onClickDeleteButton?: (type: string, questionId: string) => void;
  interviewing?: boolean;
}

const QuestionStack = ({ questionStack, interviewing, onClickAddButton, onClickDeleteButton }: Props) => (
  <Box>
    <Stack direction="row" marginBottom={2}>
      <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}>
        {questionStack.type}
      </Typography>
      {onClickAddButton && (
        <ButtonRounded
          onClick={() => {
            onClickAddButton(questionStack.type);
          }}
        >
          <IconPlus />
        </ButtonRounded>
      )}
    </Stack>
    <Stack direction="column" spacing={2}>
      {questionStack.questions.map((data) => {
        const { questionId } = data;
        return (
          <QuestionTag
            value={data}
            type={questionStack.type}
            onDeleteTag={onClickDeleteButton}
            interviewing={interviewing}
            key={questionId}
          />
        );
      })}
    </Stack>
  </Box>
);

export default React.memo(QuestionStack);
