// THIRD-PARTY
import { Stack, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';

type alertCase = 'add' | 'modify' | 'delete';
interface Props {
  id: string | number;
  alertCase: alertCase; // dựa theo method của request post=add, put=modify, delete=delete
  department: string; // language || question || adminstrator user ...
  name: string; // tên của đối tượng
  time: number; // thời gian update
  modified?: string; // for case modify ''
  to?: string; // for case add ví dụ: 'ranks list' 'applicant list'
  from?: string; // for case delete ví dụ: 'rank list' 'applicant list'
}

// {department} {name} has been added {to && `to ${to}`}
// {department} {name} has been modified {modified && modified}
// {department} {name} has been deleted {from && `from ${from}`}
// Applicant Nguyen Van Minh has been added to applicant list

const Nofity: Props[] = [
  {
    id: 0,
    alertCase: 'add',
    department: 'Applicant',
    name: 'John Doe',
    time: 1651133902216,
    to: 'applicant list'
  },
  {
    id: 1,
    alertCase: 'modify',
    department: 'Applicant',
    name: 'John Doe',
    time: 1651132802216,
    modified: 'interview status'
  },
  {
    id: 2,
    alertCase: 'delete',
    department: 'Applicant',
    name: 'John Doe',
    time: 1651131702216,
    from: 'applicant list'
  },
  {
    id: 3,
    alertCase: 'add',
    department: 'Rank',
    name: 'Senior1',
    time: 1651130602216,
    to: 'rank list'
  },
  {
    id: 4,
    alertCase: 'add',
    department: 'Rank',
    name: 'Senior1',
    time: 1651130502216,
    to: 'rank list'
  },
  {
    id: 5,
    alertCase: 'add',
    department: 'Rank',
    name: 'Senior2',
    time: 1651130202216,
    to: 'rank list'
  },
  {
    id: 6,
    alertCase: 'delete',
    department: 'Customer',
    name: 'John Doe',
    time: 1651130022126,
    from: 'customer list'
  }
];

const handleTime = (passTime: number) => {
  const durations = Date.now() - passTime;
  const seconds = {
    title: 'second',
    value: Math.floor((Date.now() - passTime) / 1000)
  };
  const minutes = {
    title: 'minute',
    value: Math.floor((Date.now() - passTime) / 1000 / 60)
  };
  const hours = {
    title: 'hour',
    value: Math.floor((Date.now() - passTime) / 1000 / 60 / 60)
  };
  const days = {
    title: 'day',
    value: Math.floor((Date.now() - passTime) / 1000 / 60 / 60 / 24)
  };
  const data = (days.value && days) || (hours.value && hours) || (minutes.value && minutes) || seconds;
  return `${data.value} ${data.value > 1 ? `${data.title}s` : data.title} ago`;
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    backgroundColor: (props: any) => {
      switch (props.alertCase) {
        case 'add':
          return '#e6f7ff';
        case 'modify':
          return '#fffbe6';
        case 'delete':
          return '#ffe6e6';
        default:
          return '#fff';
      }
    },
    borderRadius: '4px',
    border: 'solid 1px #e0e0e0',
    '&:hover': {
      backgroundColor: '#e0e0e0'
    }
  },
  textFocus: {
    fontWeight: 'bold'
  }
});

const NotificationTag = ({ alertCase, department, name, time, modified, from, to, id }: Props) => {
  const classes = useStyles({ alertCase });
  switch (alertCase) {
    case 'add':
      return (
        <Stack className={classes.root} direction="row" justifyContent="space-between" spacing={2} padding={2} margin={1}>
          <Typography variant="body1">
            {department} <span className={classes.textFocus}>{name}</span> has been added {to && `to ${to}`}
          </Typography>
          <Typography variant="body2">{handleTime(time)}</Typography>
        </Stack>
      );
    case 'modify':
      return (
        <Stack className={classes.root} direction="row" justifyContent="space-between" spacing={2} padding={2} margin={1}>
          <Typography variant="body1">
            {department} <span className={classes.textFocus}>{name}</span> has been modified {modified}
          </Typography>
          <Typography variant="body2">{handleTime(time)}</Typography>
        </Stack>
      );
    case 'delete':
      return (
        <Stack className={classes.root} direction="row" justifyContent="space-between" spacing={2} padding={2} margin={1}>
          <Typography variant="body1">
            {department} <span className={classes.textFocus}>{name}</span> has been deleted {from && `from ${from}`}
          </Typography>
          <Typography variant="body2">{handleTime(time)}</Typography>
        </Stack>
      );
    default:
      return null;
  }
};

const DashboardPage = () => (
  <MainCard title="Updates">
    {Nofity.map((item, index) => (
      <NotificationTag key={index} {...item} />
    ))}
  </MainCard>
);

export default DashboardPage;
