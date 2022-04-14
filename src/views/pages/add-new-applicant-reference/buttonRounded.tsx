import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface Props {
  children?: React.ReactNode;
  onClick?: (...arg: any[]) => void;
  backgroundColor?: string;
  width?: string;
  height?: string;
  color?: string;
}

const useStyles = makeStyles({
  buttonRounded: {
    borderRadius: '50%',
    padding: 0,
    minWidth: 'auto',
    width: '32px',
    height: '32px',
    background: (props: Props) => props.backgroundColor || '#1E88E5',
    color: (props: Props) => props.color || '#fff',
    '&:hover': {
      transition: 'all 0.2s ease-in-out',
      opacity: 0.8,
      background: (props: Props) => props.backgroundColor || '#1E88E5'
    }
  }
});

const ButtonRounded = ({ children, ...props }: Props) => {
  const classes = useStyles(props);
  return (
    <Button className={classes.buttonRounded} onClick={props.onClick}>
      {children}
    </Button>
  );
};

export default ButtonRounded;
