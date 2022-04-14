// THIRD-PARTY
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactElement } from 'react';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: '100%',
    margin: '2em 0',
    padding: '1em',
    border: 'solid 1px',
    borderColor: '#bdbdbd',
    borderRadius: '4px'
  },
  legend: {
    zIndex: 1,
    position: 'absolute',
    width: 'fit-content',
    height: '24px',
    background: 'white',
    padding: '0.25em 0.5em',
    left: '10px',
    transform: 'translate(0, -125%)'
  }
});

interface Props {
  children: ReactElement;
  legend?: string;
}

const LegendWrapper = ({ children, legend }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {legend && (
        <Typography variant="h4" component="h4" className={classes.legend}>
          {legend}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default LegendWrapper;
