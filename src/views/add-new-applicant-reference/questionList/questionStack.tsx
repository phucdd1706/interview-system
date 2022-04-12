// THIRD-PARTY
import { Stack, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { IconPlus } from '@tabler/icons';
import React from 'react';

// PROJECT IMPORTS
import QuestionTag from './questionTag';

// TYPE IMPORTS
import { QuestionStackInterface } from 'types/question';

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
        <Button
          color="success"
          sx={{ width: '32px', height: '24px', padding: 0, minWidth: 'auto' }}
          onClick={() => {
            onClickAddButton(questionStack.type);
          }}
        >
          <IconPlus />
        </Button>
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
