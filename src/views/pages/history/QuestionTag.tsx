// THIRD-PARTY
import React from 'react';
import { Stack, Typography, TableRow, TableCell, FormControl, MenuItem, Select, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// PROJECT IMPORT
import { QuestionType } from 'types/question';

interface Props {
  value: QuestionType;
  index: number;
  handleStatusQuestion: (id: number | undefined, status: number | string) => void;
}

const QuestionTag = ({ value, index, handleStatusQuestion }: Props) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const renderStatusButton = () => (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 60, height: 20 }}>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        label="Evaluate"
        value={value?.status === null ? 2 : value?.status}
        onChange={(e) => handleStatusQuestion(value?.id, Number(e.target.value))}
      >
        <MenuItem value={2}>
          <span style={{ color: '#1E88E5' }}>Skip</span>
        </MenuItem>
        <MenuItem value={0}>
          <span style={{ color: '#f44336' }}>Fail</span>
        </MenuItem>
        <MenuItem value={1}>
          <span style={{ color: '#00C853' }}>Pass</span>
        </MenuItem>
      </Select>
    </FormControl>
  );

  return (
    <TableRow hover key={value?.id}>
      <TableCell sx={{ width: '5%' }}>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{index + 1}</Typography>
        </Stack>
      </TableCell>
      <TableCell sx={{ width: matchDownMD ? '400px' : '40%', whiteSpace: 'normal !important' }} component="th" scope="row">
        <p style={{ width: matchDownMD ? '200px' : '100%', wordBreak: 'break-word' }}>{value?.question_content}</p>
      </TableCell>
      <TableCell sx={{ width: '15%' }} component="th" scope="row">
        {value?.rankName}
      </TableCell>
      <TableCell sx={{ width: '15%' }} component="th" scope="row">
        {value?.languageName}
      </TableCell>
      <TableCell sx={{ width: '15%' }}>
        {value?.type === 'advanced' ? <span style={{ color: '#f44336' }}>Advanced</span> : <span style={{ color: '#1E88E5' }}>Basic</span>}
      </TableCell>
      <TableCell sx={{ width: '10%' }} align="right">
        {renderStatusButton()}
      </TableCell>
    </TableRow>
  );
};

export default React.memo(QuestionTag);
