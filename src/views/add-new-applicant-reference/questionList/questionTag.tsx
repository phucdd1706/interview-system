import React from 'react';
import { Paper, Stack, Typography, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { IconX, IconPlus, IconDotsVertical } from '@tabler/icons';
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
  const [showNote, setShowNote] = React.useState(false);
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
              onDeleteTag(value.questionId);
            }}
          >
            <IconX height={22} />
          </Button>
        )}
        {onAddTag && (
          <Button
            color="success"
            sx={{ width: '24px', height: '24px', padding: 0, minWidth: 'auto', borderRadius: 99 }}
            onClick={() => {
              onAddTag(value.questionId);
            }}
          >
            <IconPlus height={22} />
          </Button>
        )}
        {interviewing && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100, height: 30 }}>
              <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" label="Age">
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
      {showNote && <textarea rows={3} style={{ width: '100%', resize: 'none', marginTop: '1em', padding: '0.5em' }} placeholder="Notes" />}
    </Paper>
  );
};

export default React.memo(QuestionTag);
