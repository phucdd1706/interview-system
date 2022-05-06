// THIRD-PARTY
import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogActions,
  Button,
  Grid,
  DialogTitle,
  IconButton,
  TextField,
  DialogContent,
  Tab,
  Tabs,
  useTheme,
  FormControl,
  Box,
  Typography
} from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

// Icons Import
import CloseIcon from '@mui/icons-material/Close';
import EventTabs from './SelectTabs/EventTabs';
import InterviewTabs from './SelectTabs/InterviewTabs';
import ReminderTabs from './SelectTabs/ReminderTabs';

// PROJECT IMPORTS

interface Props {
  open: boolean;
  // handleDialogOpen: () => void;
  setOpen: any;
  selectInfo: any;
  createEventId: any;
}

export interface RefObject {
  SayHi: () => void;
  startTime: Date | null;
  endTime: Date | null;
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

const SelectDialog = ({ open, setOpen, selectInfo, createEventId }: Props) => {
  const theme = useTheme();
  const anchorRef = useRef<HTMLDivElement>(null);
  const [tabsValue, setTabsValue] = useState('1');
  const [title, setTitle] = useState('');
  const selectRef = useRef<RefObject>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabsValue(newValue);
  };

  const handleSave = () => {
    const calendarApi = selectInfo.view.calendar;
    // const title = prompt(`Please enter a new title for your event from ${selectInfo.startStr} to ${selectInfo.endStr}`);
    console.log(selectInfo);
    calendarApi.unselect();
    if (title && title !== '') {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
      handleDialogClose();
    } else {
      console.error('Some Error Occurred While Saving Event!');
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDialogClose = () => {
    setTitle('');
    setOpen(false);
  };

  // test function
  const onButtonClick = () => {
    if (selectRef.current) {
      selectRef.current.SayHi();
      alert(selectRef.current.startTime);
    }
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
      PaperProps={{
        style: { borderRadius: 5 }
      }}
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
      {/* Header */}
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose} />
      {/* Body */}
      <DialogContent sx={{ padding: '0px 0px 20px' }}>
        <Grid container>
          <Grid item width="95%" sx={{ marginLeft: 8 }}>
            <FormControl fullWidth>
              <TextField
                id="select-title-input"
                value={title}
                onChange={handleTitleChange}
                variant="standard"
                label="Add Title"
                inputProps={{ style: { fontSize: 18 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
                fullWidth
                required
                sx={{ paddingTop: 1 }}
              />
            </FormControl>
          </Grid>
          <Grid item width="95%">
            <TabContext value={tabsValue}>
              <Box>
                <Tabs
                  value={tabsValue}
                  onChange={handleChange}
                  variant="fullWidth"
                  sx={{
                    height: 10,
                    marginLeft: 8,
                    marginTop: 1,
                    '& .MuiTabs-indicator': {
                      height: 0
                    },
                    '& .MuiTab-root.Mui-selected': {
                      backgroundColor: theme.palette.primary.light
                    },
                    "& button[aria-selected='true']": {
                      borderRadius: 1.5
                    }
                  }}
                  // TabIndicatorProps={{
                  //   style: {
                  //     transition: 'none'
                  //   }
                  // }}
                >
                  <Tab label="Interview" value="1" />
                  <Tab label="Event" value="2" />
                  <Tab label="Reminder" value="3" />
                </Tabs>
              </Box>
              <TabPanel value="1">
                {' '}
                <InterviewTabs selectInfo={selectInfo} ref={selectRef} />{' '}
              </TabPanel>
              <TabPanel value="2">
                {' '}
                <EventTabs selectInfo={selectInfo} ref={selectRef} />{' '}
              </TabPanel>
              <TabPanel value="3">
                {' '}
                <ReminderTabs selectInfo={selectInfo} ref={selectRef} />{' '}
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </DialogContent>
      {/* Footer */}
      <DialogActions>
        <Button onClick={onButtonClick}>More Options</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SelectDialog;
