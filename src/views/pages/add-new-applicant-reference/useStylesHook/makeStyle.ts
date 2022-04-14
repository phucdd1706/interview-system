import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  itemHovered: {
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#c6f9ff'
    },
    '&:hover button': {
      transition: '0.7s',
      transform: 'translate(-5px, 0)'
    }
  }
});

export default useStyles;
