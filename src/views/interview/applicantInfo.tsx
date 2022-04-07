import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const initialEmployeeForm = {
  firstName: 'Minh',
  lastName: 'Nguyen',
  age: '21',
  email: 'minhnv@beetsoft.com.vn',
  phone: '123412345',
  address: 'Minh Khai, Bac Tu Liem, Ha Noi',
  applyPosition: [
    {
      id: '12',
      positionName: 'ReactJS',
      level: 'J1'
    },
    {
      id: '12',
      positionName: 'NodeJS',
      level: 'J2'
    }
  ],
  notes: '',
  interviewTime: `${new Date().toISOString().split('T')[0]}T00:00`
};

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

type dataKey = keyof typeof initialEmployeeForm;
type rowKey = keyof typeof RenderRow;

const ApplicantInfo = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack direction="column" spacing={3}>
      {Object.keys(RenderRow).map((row: string, index: number) => (
        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={3} key={index}>
          {RenderRow[row as rowKey].map((data: { key: string; label: string }) => (
            <Stack direction="row" key={data.key} sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="h4" key={data.key}>
                {data.label}: &nbsp;
              </Typography>
              <Typography variant="body1" component="span" key={data.key}>
                {initialEmployeeForm[data.key as dataKey]}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ))}
      <Stack direction={matchDownSM ? 'column' : 'row'}>
        <Typography variant="h4" component="h4">
          Apply Position:
        </Typography>
        {initialEmployeeForm.applyPosition.map((data: { id: string; positionName: string; level: string }, index) => (
          <>
            <Typography variant="body1" component="span" key={index}>
              &nbsp;{data.positionName} - {data.level}&nbsp;
            </Typography>
            {index < initialEmployeeForm.applyPosition.length - 1 && !matchDownSM && '/'}
          </>
        ))}
      </Stack>
    </Stack>
  );
};

export default ApplicantInfo;
