// THIRD-PARTY
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';

// PROJECT IMPORTS
import Transitions from 'ui-component/extended/Transitions';
import useConfig from 'hooks/useConfig';

const UserAvatar = () => {
  const { borderRadius } = useConfig();

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<any>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          [theme.breakpoints.down('md')]: {
            ml: 1
          },
          cursor: 'pointer'
        }}
      >
        <Avatar
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{ bgcolor: deepOrange[500] }}
        >
          M
        </Avatar>
      </Box>

      <Popper
        placement={matchesXs ? 'bottom-start' : 'bottom'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 0 : 0, 20]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions position={matchesXs ? 'top-left' : 'top'} in={open} {...TransitionProps}>
              <Paper elevation={16}>
                {open && (
                  <List
                    component="nav"
                    sx={{
                      width: '100%',
                      minWidth: 150,
                      maxWidth: 250,
                      bgcolor: theme.palette.background.paper,
                      borderRadius: `${borderRadius}px`,
                      [theme.breakpoints.down('md')]: {
                        maxWidth: 200
                      }
                    }}
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">Profile</Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText
                        primary={
                          <Grid container>
                            <Typography color="textPrimary">Logout</Typography>
                          </Grid>
                        }
                      />
                    </ListItemButton>
                  </List>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default UserAvatar;
