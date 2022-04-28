// THIRD-PARTY
import React from 'react';
import {
  Dialog,
  DialogActions,
  Button,
  Typography,
  Grid,
  CardHeader,
  Card,
  CardContent,
  Link,
  ButtonGroup,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  DialogTitle,
  IconButton
} from '@mui/material';

// PROJECT IMPORTS

// Icons Import
import NoiseControlOffOutlinedIcon from '@mui/icons-material/NoiseControlOffOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PhoneIcon from '@mui/icons-material/Phone';
import EventIcon from '@mui/icons-material/Event';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CloseIcon from '@mui/icons-material/Close';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

interface Props {
  open: boolean;
  // handleDialogOpen: () => void;
  setOpen: any;
  selectInfo: any;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {/* {children} */}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const SelectDialog = ({ open, setOpen, selectInfo }: Props) => {
  const GoogleMeetURL = 'meet.google.com/fmf-qqrg-cbg';
  const PhoneMeet = '0123456789';
  const PersonCreater = 'Do Dinh Phuc';
  const HasMeet = true;

  const [openButton, setOpenButton] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
    setOpenButton(false);
  };

  const handleToggle = () => {
    setOpenButton((prevOpenButton) => !prevOpenButton);
  };

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpenButton(false);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      // onClose={() => setOpen(false)}
      onClose={handleDialogClose}
      // aria-labelledby="event-dialog"
      scroll="paper"
      fullWidth
      maxWidth="xs"
      sx={{
        '&>div:nth-of-type(3)': {
          '&>div': {
            m: 0,
            borderRadius: '0px',
            maxHeight: '100%'
          }
        }
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose} />
    </Dialog>
  );
};
export default SelectDialog;
