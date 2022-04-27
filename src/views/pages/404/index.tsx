import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="column" spacing={2} alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Typography variant="h3" component="h3" sx={{ fontSize: 180, display: 'flex' }}>
        4
        <Typography variant="h3" component="h3" sx={{ fontSize: 180, color: '#00abff' }}>
          0
        </Typography>
        4
      </Typography>
      <Typography variant="h3" component="h3" sx={{ fontSize: 36 }}>
        Ooops!!
      </Typography>
      <Typography variant="body1" component="h3" textAlign="center" sx={{ fontSize: 28 }}>
        THAT PAGE DOESN&#180;T EXIST OR UNAVAILABLE
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: '5em !important', fontSize: 22, padding: '0.5em 1.5em', backgroundColor: '#00abff' }}
        onClick={() => {
          navigate('/dashboard/analytics', { replace: true });
        }}
      >
        Back To Dashboard
      </Button>
    </Stack>
  );
};

export default PageNotFound;
