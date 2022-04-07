// THIRD-PARTY
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const ResponseResult = {
  passedQuestion: '10/12',
  failedQuestion: '2',
  score: '80%',
  result: 'Passed',
  salary: '10,000,000'
};

type keyType = keyof typeof ResponseResult;

const ReferenceResult = () => {
  const [result, setResult] = useState(ResponseResult);
  return (
    <Box>
      {Object.keys(result).map((key) => (
        <Stack direction="row" sx={{ alignItems: 'center', marginBottom: 1 }} key={key}>
          <Typography variant="h4" component="h4" sx={{ lineHeight: 1 }}>
            {key}:&nbsp;
          </Typography>
          <Typography variant="body1" component="span" sx={{ lineHeight: 1 }}>
            {result[key as keyType]}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default ReferenceResult;
