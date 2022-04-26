// THIRD-PARTY
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ApplicantInfo } from 'types/applicantData';

const RenderRow = {
  row1: [
    {
      key: 'firstName',
      label: 'First Name'
    },
    {
      key: 'lastName',
      label: 'Last Name'
    },
    {
      key: 'age',
      label: 'Age'
    }
  ],
  row2: [
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'phone',
      label: 'Phone'
    }
  ],
  row3: [
    {
      key: 'address',
      label: 'Address'
    }
  ],
  row4: [
    {
      key: 'interviewTime',
      label: 'Interview Time'
    }
  ]
};

type dataKey = 'firstName' | 'lastName' | 'email' | 'phone' | 'address' | 'notes';
type rowKey = keyof typeof RenderRow;

interface Props {
  applicantInfo: ApplicantInfo;
}

const ApplicantInformation = ({ applicantInfo }: Props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack direction="column" spacing={3}>
      {Object.keys(RenderRow).map((row: string, index: number) => (
        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={3} key={index}>
          {RenderRow[row as rowKey].map((data: { key: string; label: string }) => (
            <Stack direction="row" key={data.key} sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="h4">
                {data.label}: &nbsp;
              </Typography>
              <Typography variant="h4" component="h4" sx={{ fontWeight: '400' }}>
                {applicantInfo[data.key as dataKey]}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ))}
      <Stack direction={matchDownSM ? 'column' : 'row'}>
        <Typography variant="h4" component="h4">
          Apply Position:
        </Typography>
        {applicantInfo.applyPosition.map((data: { rank_advanced_id: string; language_id: string; rank_id: string }, index) => (
          <Typography variant="h4" component="h4" sx={{ fontWeight: '400' }} key={index}>
            &nbsp;{data.language_id} - {data.rank_id}&nbsp;
            {index < applicantInfo.applyPosition.length - 1 && !matchDownSM && '/'}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
};

export default ApplicantInformation;
