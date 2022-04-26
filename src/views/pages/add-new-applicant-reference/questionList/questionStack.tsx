// THIRD-PARTY
import { Stack, Typography, Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

// PROJECT IMPORTS
import QuestionTag from './questionTag';
import { useDispatch } from 'store';
import { questionsInit } from 'store/slices/applicant/applicantReferences';

// TYPE IMPORTS
import { InterviewQuestions, QuestionStackInterface } from 'types/interviewQuestion';
import { QuestionType } from 'types/question';

interface Props {
  questionStack: QuestionType[];
  onClickAddButton?: (type: string) => void;
  onClickDeleteButton?: (type: string, id: number) => void;
  interviewing?: boolean;
  stackType: string;
}

const QuestionStack = ({ questionStack, interviewing, stackType, onClickAddButton, onClickDeleteButton }: Props) => {
  const dispatch = useDispatch();
  return (
    <Box>
      <Stack direction="row" marginBottom={2}>
        <Typography variant="h4" component="h4" sx={{ flexGrow: 1 }}>
          {stackType?.toUpperCase()}
        </Typography>
        {onClickAddButton && (
          <Fab
            sx={{ width: '30px', height: '30px', minHeight: 'auto', minWidth: 'auto', padding: 0 }}
            color="primary"
            aria-label="add"
            onClick={() => {
              onClickAddButton(stackType);
              dispatch(questionsInit());
            }}
          >
            <AddIcon />
          </Fab>
        )}
      </Stack>
      <Stack direction="column" spacing={2}>
        {questionStack.map((question, index) => (
          <QuestionTag value={question} type={stackType} onDeleteTag={onClickDeleteButton} interviewing={interviewing} key={index} />
        ))}
      </Stack>
    </Box>
  );
};

export default React.memo(QuestionStack);
