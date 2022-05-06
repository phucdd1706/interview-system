import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  itemHovered: {
    cursor: 'pointer',
    border: 'solid 1px #e0e0e0',
    borderColor: (props: any) => {
      if (props.interviewing) {
        switch (props.status) {
          case 0:
            return 'rgb(255, 0, 0)';
          case 1:
            return 'rgb(0, 255, 0)';
          case 2:
            return '#e0e0e0';
          default:
            return '#e0e0e0';
        }
      } else {
        return '#e0e0e0';
      }
    },
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
