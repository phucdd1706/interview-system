// THIRD-PARTY
import React from 'react';
import { Paper, Stack, Typography, FormControl, MenuItem, Select, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

// PROJECT IMPORT
import useStyles from '../useStylesHook/makeStyle';
import { useDispatch } from 'store';
import { handleAnswerStatus } from 'store/slices/applicant/applicantReferences';
import { QuestionType } from 'types/question';

interface Props {
  value: QuestionType;
  interviewing?: boolean;
}

const QuestionTag = ({ value, interviewing = false }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Paper className={classes.itemHovered} variant="outlined" sx={{ padding: '1em' }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="body1" component="span" sx={{ flexGrow: 1 }}>
          {value.question_content}
        </Typography>
        {interviewing && (
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 100, height: 30 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Evaluate"
                // @ts-ignore
                value={typeof value.status === 'number' ? value.status + 1 : 3}
                onChange={(e) => {
                  dispatch(handleAnswerStatus({ id: value.candidate_id || 0, status: Number(e.target.value) - 1 }));
                }}
              >
                <MenuItem value={3}>Skip</MenuItem>
                <MenuItem value={1}>Fail</MenuItem>
                <MenuItem value={2}>Pass</MenuItem>
              </Select>
            </FormControl> */}
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={typeof value.status === 'number' ? value.status + 1 : 3}
                onChange={(e) => {
                  dispatch(handleAnswerStatus({ id: value.candidate_id || 0, status: Number(e.target.value) - 1 }));
                }}
                name="radio-buttons-group"
              >
                <Stack direction="row">
                  <FormControlLabel value={3} control={<Radio />} label="Skip" labelPlacement="top" />
                  <FormControlLabel value={1} control={<Radio />} label="Fail" labelPlacement="top" />
                  <FormControlLabel value={2} control={<Radio />} label="Pass" labelPlacement="top" />
                </Stack>
              </RadioGroup>
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
