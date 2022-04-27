// THIRD-PARTY
import React from 'react';
import { Paper, Stack, Typography, Button, FormControl, MenuItem, Select, Fab } from '@mui/material';
import { IconX, IconDotsVertical } from '@tabler/icons';

// PROJECT IMPORT
import useStyles from '../useStylesHook/makeStyle';
import { useDispatch } from 'store';
import { handleAnswerStatus } from 'store/slices/applicant/applicantReferences';
import AddIcon from '@mui/icons-material/Add';
import { QuestionType } from 'types/question';

interface Props {
  value: QuestionType;
  type: string;
  interviewing?: boolean;
  onDeleteTag?: (questionType: string, id: number) => void;
  onAddTag?: (questionType: string, language: string, question: QuestionType) => void;
}

const QuestionTag = ({ value, interviewing = false, type, onDeleteTag, onAddTag }: Props) => {
  console.log('%c 🆑 ', `background: #${Math.floor(Math.random() * 999999)};color: #fff;font-weight: 700`, '🚀 ~ value', value);
  const classes = useStyles();
  const [showNote, setShowNote] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <Paper className={classes.itemHovered} variant="outlined" sx={{ padding: '1em' }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="body1" component="span" sx={{ flexGrow: 1 }}>
          {value.question_content}
        </Typography>
        {onDeleteTag && (
          <Button
            color="error"
            sx={{ width: '24px', height: '24px', padding: 0, minWidth: 'auto', borderRadius: 99 }}
            onClick={() => {
              onDeleteTag(type, value.id || -1);
            }}
          >
            <IconX height={22} />
          </Button>
        )}
        {onAddTag && (
          <Fab
            sx={{ width: '28px', height: '28px', minHeight: 'auto', minWidth: '28px', padding: 0 }}
            color="primary"
            aria-label="add"
            onClick={() => {
              onAddTag(type, 'reactjs', value);
            }}
          >
            <AddIcon height={22} />
          </Fab>
        )}
        {interviewing && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100, height: 30 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Evaluate"
                value={value.status || 1}
                onChange={(e) => {
                  dispatch(handleAnswerStatus({ id: value.id || 0, status: e.target.value }));
                }}
              >
                <MenuItem value={1}>Pending</MenuItem>
                <MenuItem value={2}>Done</MenuItem>
              </Select>
            </FormControl>
            {/* <Button
              color="success"
              sx={{ width: '24px', height: '24px', padding: 0, minWidth: 'auto', borderRadius: 99 }}
              onClick={() => {
                setShowNote(!showNote);
              }}
            >
              <IconDotsVertical height={22} />
            </Button> */}
          </Stack>
        )}
      </Stack>
      {/* {showNote && (
        <textarea
          value={value.notes}
          onChange={(e) => {
            // dispatch(handleInterviewQuestionNotes({ id: value.id, notes: e.target.value }));
          }}
          rows={3}
          style={{ width: '100%', resize: 'none', marginTop: '1em', padding: '0.5em' }}
          placeholder="Notes"
        />
      )} */}
    </Paper>
  );
};

export default React.memo(QuestionTag);
