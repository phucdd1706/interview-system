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
  IconButton,
  useTheme
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
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface Props {
  open: boolean;
  // handleDialogOpen: () => void;
  setOpen: any;
  eventInfo: any;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const EventDialogTitle = (props: DialogTitleProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, pb: 0, pt: 0, pr: 2, display: 'flex', width: '100%', justifyContent: 'right' }} {...other}>
      {/* {children} */}
      <IconButton
        aria-label="delete"
        onClick={onClose}
        sx={{
          position: 'relative',
          right: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <EditOutlinedIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={onClose}
        sx={{
          position: 'relative',
          right: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <DeleteOutlinedIcon />
      </IconButton>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'relative',
            right: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const ViewEventDialog = ({ open, setOpen, eventInfo }: Props) => {
  const GoogleMeetURL = 'meet.google.com/fmf-qqrg-cbg';
  const PhoneMeet = '0123456789';
  const PersonCreater = 'Do Dinh Phuc';
  const HasMeet = true;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = useTheme();
  const [openButton, setOpenButton] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const options = [
    { id: 0, title: 'Yes, in a meeting room', icon: <MeetingRoomIcon sx={{ marginRight: '5px' }} /> },
    { id: 1, title: 'Yes', icon: <CheckOutlinedIcon sx={{ marginRight: '5px' }} /> },
    { id: 2, title: 'Yes, joining virtually', icon: <VideocamOutlinedIcon sx={{ marginRight: '5px' }} /> }
  ];
  // const options = ['yes', 'no', 'haha'];
  // AccessTimeFilledIcon

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex].title}`);
    switch (selectedIndex) {
      case 0:
        console.log('Yes, in a meeting room');
        handleDialogClose();
        break;
      case 1:
        console.log('Yes');
        handleDialogClose();
        break;
      case 2:
        console.log('Yes, joining virtually');
        handleDialogClose();
        break;
    }
  };

  // const renderMenuItem = (option: any, index: number) => {
  //   const value = option.title;
  //   return (
  //     <MenuItem
  //       key={value}
  //       value={value}
  //       disabled={index === 2}
  //       selected={index === selectedIndex}
  //       onClick={(event) => handleMenuItemClick(event, index)}
  //     >
  //       {/* {option.icon} */}
  //       <Typography>1111</Typography>
  //     </MenuItem>
  //   );
  // };

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
      onClose={handleDialogClose}
      aria-labelledby="event-dialog"
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
      <EventDialogTitle id="select-dialog-title" onClose={handleDialogClose} />
      <Card>
        <CardHeader
          sx={{ paddingLeft: 3, paddingBottom: 1, paddingTop: 1 }}
          // whiteSpace="break-spaces"
          avatar={<NoiseControlOffOutlinedIcon color="primary" />}
          title={<Typography variant="h2">{eventInfo?.title}</Typography>}
          subheader={
            <Typography>
              <Typography variant="subtitle2">
                {' '}
                Start:{' '}
                {eventInfo?.allDay
                  ? eventInfo?.start.toLocaleString('en-US', {
                      weekday: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      month: 'long'
                    })
                  : eventInfo?.start.toLocaleString('en-US', {
                      weekday: 'short', // long, short, narrow
                      day: 'numeric', // numeric, 2-digit
                      year: 'numeric', // numeric, 2-digit
                      month: 'long', // numeric, 2-digit, long, short, narrow
                      hour: 'numeric', // numeric, 2-digit
                      minute: 'numeric' // numeric, 2-digit
                    })}
              </Typography>

              {eventInfo?.allDay ? (
                <></>
              ) : (
                <Typography>
                  <Typography variant="subtitle2">
                    {' '}
                    End:{' '}
                    {eventInfo?.end.toLocaleString('en-US', {
                      weekday: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      month: 'long',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </Typography>
                </Typography>
              )}
            </Typography>
          }
        />
        <CardContent>
          <Grid container>
            {HasMeet === true ? (
              <Grid>
                <Grid container item direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                  <Grid item>
                    <MeetingRoomIcon fontSize="small" />
                  </Grid>
                  <Grid item>
                    <Button variant="contained">Join With Google Meet</Button>
                    <Typography variant="subtitle2">{GoogleMeetURL}</Typography>
                  </Grid>
                </Grid>
                <Grid container item direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ marginTop: '2px' }}>
                  <Grid item>
                    <PhoneIcon fontSize="small" />
                  </Grid>
                  <Grid item>
                    <Link href="#" underline="hover">
                      Join By Phone
                    </Link>
                    <Typography variant="subtitle2">{PhoneMeet}</Typography>
                  </Grid>
                </Grid>
                <Grid container item direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ marginTop: '2px' }}>
                  <Grid item>
                    <LaunchOutlinedIcon fontSize="small" />
                  </Grid>
                  <Grid item>
                    <Link href="#" underline="hover">
                      More Phone Numbers
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}

            <Grid container item direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ marginTop: '2px' }}>
              <Grid item>
                <NotificationsOutlinedIcon fontSize="small" />
              </Grid>
              <Grid item>
                <Typography>10 Minutes Before</Typography>
              </Grid>
            </Grid>

            <Grid container item direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ marginTop: '2px' }}>
              <Grid item>
                <EventIcon fontSize="small" />
              </Grid>
              <Grid item>
                <Typography>{PersonCreater}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <DialogActions>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography>Going?</Typography>
          </Grid>
          <Grid item>
            <>
              <ButtonGroup sx={{ mr: 1 }} size="small" variant="outlined" ref={anchorRef} aria-label="split button">
                <Button onClick={handleClick}>{options[selectedIndex].title}</Button>
                <Button
                  size="small"
                  aria-controls={openButton ? 'split-button-menu' : undefined}
                  aria-expanded={openButton ? 'true' : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon fontSize="small" />
                </Button>
              </ButtonGroup>
              <Popper open={openButton} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                    }}
                  >
                    <Paper elevation={6} square>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option.id}
                              disabled={index === 2}
                              selected={index === selectedIndex}
                              onClick={(event) => handleMenuItemClick(event, index)}
                            >
                              {option.icon} {option.title}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
            <Button sx={{ mr: 1 }} size="small" variant="outlined">
              No
            </Button>
            <Button sx={{ mr: 1 }} size="small" variant="outlined">
              Maybe
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
export default ViewEventDialog;
