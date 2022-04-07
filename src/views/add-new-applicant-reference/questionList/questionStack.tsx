import { Stack, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { IconPlus } from '@tabler/icons';
import React from 'react';
import QuestionTag from './questionTag';

interface Props {
  questionStack: {
    type: string;
    questions: Array<{ questionId: string; question: string }>;
  };
  onClickAddButton: () => void;
  onClickDeleteButton?: (id: string) => void;
}
const QuestionStack = ({ questionStack, onClickAddButton, onClickDeleteButton }: Props) => (
  <Box sx={{ marginBottom: 2 }}>
    <Stack direction="row" sx={{ marginBottom: '1.5em' }}>
      <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}>
        {questionStack.type}
      </Typography>
      <Button
        color="success"
        sx={{ width: '32px', height: '24px', padding: 0, minWidth: 'auto' }}
        onClick={() => {
          onClickAddButton();
        }}
      >
        <IconPlus />
      </Button>
    </Stack>
    <Stack direction="column" spacing={2}>
      {questionStack.questions.map((data) => {
        const { questionId, question } = data;
        return <QuestionTag value={data} onDeleteTag={onClickDeleteButton} key={questionId} />;
      })}
    </Stack>
  </Box>
);

export default React.memo(QuestionStack);
