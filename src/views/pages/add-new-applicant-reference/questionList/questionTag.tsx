// THIRD-PARTY
import React from 'react';
import { Paper, Stack, Typography, Button, FormControl, MenuItem, Select } from '@mui/material';
import { IconX, IconPlus, IconDotsVertical } from '@tabler/icons';

// PROJECT IMPORT
import useStyles from '../useStylesHook/makeStyle';
import { useDispatch } from 'store';
import { handleAnswerScore, handleInterviewQuestionNotes } from 'store/slices/applicantReferences';
import ButtonRounded from 'views/pages/add-new-applicant-reference/buttonRounded';

interface Props {
  value: {
    questionId: string;
    question: string;
    notes?: string;
    answerScore?: string;
  };
  type: string;
  interviewing?: boolean;
  onDeleteTag?: (type: string, questionId: string) => void;
  onAddTag?: (type: string, question: { questionId: string; question: string }) => void;
}

const QuestionTag = ({ value, interviewing = false, type, onDeleteTag, onAddTag }: Props) => {
  const classes = useStyles();
  const [showNote, setShowNote] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <Paper className={classes.itemHovered} variant="outlined" sx={{ padding: '1em' }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="body1" component="span" sx={{ flexGrow: 1 }}>
          {value.question}
        </Typography>
        {onDeleteTag && (
          <Button
            color="error"
            sx={{ width: '24px', height: '24px', padding: 0, minWidth: 'auto', borderRadius: 99 }}
            onClick={() => {
              onDeleteTag(type, value.questionId);
            }}
          >
            <IconX height={22} />
          </Button>
        )}
        {onAddTag && (
          <ButtonRounded
            onClick={() => {
              onAddTag(type, value);
            }}
          >
            <IconPlus height={22} />
          </ButtonRounded>
        )}
        {interviewing && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100, height: 30 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Evaluate"
                value={value.answerScore}
                onChange={(e) => {
                  dispatch(handleAnswerScore({ questionId: value.questionId, answerScore: e.target.value }));
                }}
              >
                <MenuItem value="">
                  <em>Evaluate</em>
                </MenuItem>
                <MenuItem value="bad">Bad</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="excellent">Excellent</MenuItem>
              </Select>
            </FormControl>
            <Button
              color="success"
              sx={{ width: '24px', height: '24px', padding: 0, minWidth: 'auto', borderRadius: 99 }}
              onClick={() => {
                setShowNote(!showNote);
              }}
            >
              <IconDotsVertical height={22} />
            </Button>
          </Stack>
        )}
      </Stack>
      {showNote && (
        <textarea
          value={value.notes}
          onChange={(e) => {
            dispatch(handleInterviewQuestionNotes({ questionId: value.questionId, notes: e.target.value }));
          }}
          rows={3}
          style={{ width: '100%', resize: 'none', marginTop: '1em', padding: '0.5em' }}
          placeholder="Notes"
        />
      )}
    </Paper>
  );
};

export default React.memo(QuestionTag);
