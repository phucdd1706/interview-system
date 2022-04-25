// THIRD-PARTY
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

// PROJECT IMPORTS
import { ReferenceEvaluate } from 'types/applicantData';

const dataMapping = [
  {
    key: 'totalQuestions',
    label: 'Total Questions'
  },
  {
    key: 'passedQuestions',
    label: 'Passed Questions'
  },
  {
    key: 'failedQuestions',
    label: 'Failed Questions'
  },
  {
    key: 'passedPercentage',
    label: 'Passed Percentage'
  },
  {
    key: 'result',
    label: 'Result'
  },
  {
    key: 'salary',
    label: 'Salary'
  }
];

interface Props {
  result: ReferenceEvaluate;
}

type keyType = keyof ReferenceEvaluate;

const ReferenceResult = ({ result }: Props) => (
  <Box>
    {dataMapping.map((element) => (
      <Stack direction="row" sx={{ alignItems: 'center', marginBottom: 1 }} key={element.key}>
        <Typography variant="h4" component="h4" sx={{ lineHeight: 1 }}>
          {element.label}:&nbsp;
        </Typography>
        <Typography variant="h4" component="h4" sx={{ lineHeight: 1.25, fontWeight: '400' }}>
          {element.key === 'salary' ? Number(result[element.key as keyType]).toLocaleString() : result[element.key as keyType]}
        </Typography>
      </Stack>
    ))}
  </Box>
);

export default ReferenceResult;
