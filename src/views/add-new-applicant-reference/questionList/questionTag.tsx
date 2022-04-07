import React from 'react';
import { Paper, Stack, Typography, Button } from '@mui/material';
import { IconX, IconPlus } from '@tabler/icons';
import useStyles from '../useStylesHook/makeStyle';

interface Props {
  value: {
    questionId: string;
    question: string;
  };
  interviewing?: boolean;
  onDeleteTag?: (id: string) => void;
  onAddTag?: (id: string) => void;
}

const QuestionTag = ({ value, interviewing = false, onDeleteTag, onAddTag }: Props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.itemHovered} variant="outlined" sx={{ padding: '1em' }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="body1" component="span" sx={{ flexGrow: 1 }}>
          {value.question}
        </Typography>
        {onDeleteTag && (
          <Button
            color="error"
            sx={{ width: '32px', height: '24px', padding: 0, minWidth: 'auto' }}
            onClick={() => {
              onDeleteTag(value.questionId);
            }}
          >
            <IconX />
          </Button>
        )}
        {onAddTag && (
          <Button
            color="success"
            sx={{ width: '32px', height: '24px', padding: 0, minWidth: 'auto' }}
            onClick={() => {
              onAddTag(value.questionId);
            }}
          >
            <IconPlus />
          </Button>
        )}
      </Stack>
      {interviewing && (
        <textarea rows={3} style={{ width: '100%', resize: 'none', marginTop: '1em', padding: '0.5em' }} placeholder="Notes" />
      )}
    </Paper>
  );
};

export default React.memo(QuestionTag);
