// THIRD-PARTY
import { Stack, Typography, Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

// PROJECT IMPORTS
import QuestionTag from './questionTag';
import { useDispatch } from 'store';
import { questionsInit } from 'store/slices/applicantReferences';

// TYPE IMPORTS
import { QuestionStackInterface } from 'types/interviewQuestion';

interface Props {
  questionStack: QuestionStackInterface;
  onClickAddButton?: (type: string) => void;
  onClickDeleteButton?: (type: string, questionId: string) => void;
  interviewing?: boolean;
}

const QuestionStack = ({ questionStack, interviewing, onClickAddButton, onClickDeleteButton }: Props) => {
  const dispatch = useDispatch();
  return (
    <Box>
      <Stack direction="row" marginBottom={2}>
        <Typography variant="h3" component="h3" sx={{ flexGrow: 1 }}>
          {questionStack.type}
        </Typography>
        {onClickAddButton && (
          <Fab
            sx={{ width: '30px', height: '30px', minHeight: 'auto', minWidth: 'auto', padding: 0 }}
            color="primary"
            aria-label="add"
            onClick={() => {
              onClickAddButton(questionStack.type);
              dispatch(questionsInit());
            }}
          >
            <AddIcon />
          </Fab>
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
};

export default React.memo(QuestionStack);
