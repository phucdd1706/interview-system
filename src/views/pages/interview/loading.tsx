import { Box, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
  '@keyframes pulse': {
    '0%': {
      backgroundColor: '#9880ff'
    },
    '100%': {
      backgroundColor: '#ebe6ff'
    }
  },
  root: {
    position: 'relative',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#9880ff',
    animation: `$pulse 1.5s infinite`,
    animationDelay: '0.3s'
  },
  dot2: {
    position: 'relative',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#9880ff',
    animation: `$pulse 1.5s infinite`,
    animationDelay: '0.4s'
  },
  dot3: {
    position: 'relative',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#9880ff',
    animation: `$pulse 1.5s infinite`,
    animationDelay: '0.5s'
  }
});

const Loading = () => {
  const classes = useStyle();
  return (
    <Stack direction="row" spacing={0.5} sx={{ height: 20, alignItems: 'center' }}>
      <Box className={classes.root} />
      <Box className={classes.dot2} />
      <Box className={classes.dot3} />
    </Stack>
  );
};

export default Loading;
