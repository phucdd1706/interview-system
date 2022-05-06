// THIRD-PARTY
import React from 'react';
import { Paper, Stack, Typography, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

// PROJECT IMPORT
import useStyles from '../useStylesHook/makeStyle';
import { useDispatch } from 'store';
import { handleAnswerStatus } from 'store/slices/applicant/applicantReferences';
import { QuestionType } from 'types/question';

interface Props {
  value: QuestionType;
  interviewing?: boolean;
  index: number;
}

const QuestionTag = ({ value, interviewing = false, index }: Props) => {
  const classes = useStyles({ interviewing, status: value.status });
  const dispatch = useDispatch();
  return (
    <Paper className={classes.itemHovered} variant="outlined" sx={{ padding: '1em' }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="body1" component="span" sx={{ flexGrow: 1 }}>
          Câu hỏi : {value.question_content}?
        </Typography>
        {interviewing && (
          <Stack direction="row" alignItems="center" spacing={2}>
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
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default React.memo(QuestionTag);
