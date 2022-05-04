import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { Box, Button, Card, Grid, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material';
import { RefObject } from '../SelectDialog';
import DatePicker from '@mui/lab/DatePicker/DatePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker/DesktopTimePicker';

// ICONS IMPORT
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import EventIcon from '@mui/icons-material/Event';

const InterviewTabs = forwardRef((props: { selectInfo: any }, selectRef: Ref<RefObject>) => {
  const theme = useTheme();
  const FileTitle = 'Interview Tabs';
  const { selectInfo } = props;
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const [datePicker, setDatePicker] = useState<Date | null>(new Date(selectInfo.start));
  const [startTime, setStartTime] = useState<Date | null>(new Date(selectInfo.start));
  const [tabsValue, setTabsValue] = useState(1);
  useImperativeHandle(selectRef, () => ({ SayHi, FileTitle }));

  function SayHi() {
    // eslint-disable-next-line no-alert
    alert(`${selectInfo?.start}`);
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 1:
        setOpenDatePicker(() => !openDatePicker);
        break;
      case 2:
        setOpenStartTimePicker(() => !openStartTimePicker);
        break;
      case 3:
        break;
      default:
        console.error('Some Error Occurred While Choose Date or Time');
    }
  };

  console.log(startTime);
  console.error = () => {}; // --------------- Disable Console Error --------------

  return (
    <Card>
      <Grid container justifyContent="flex-start" alignItems="center">
        <Grid item alignItems="center">
          <AccessTimeIcon fontSize="small" />
        </Grid>
        <Grid item marginLeft={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              open={openDatePicker}
              onClose={() => setOpenDatePicker(false)}
              label="Basic example"
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
              renderInput={({ inputRef, inputProps, disabled, onChange, value }) => (
                <Box ref={inputRef} sx={{ display: 'flex', alignItems: 'center' }}>
                  <input style={{ display: 'none' }} onChange={onChange} disabled={disabled} {...inputProps} />
                  {inputProps?.endAdornment}
                  <Tabs
                    // value={tabsValue}
                    onChange={handleChange}
                    variant="fullWidth"
                    sx={{
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
                  >
                    {/* <Tab label="Interview" value="1" /> */}
                    <Tab
                      label={
                        startTime?.toLocaleString('en-US', {
                          weekday: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          month: 'long'
                        }) || ''
                      }
                      value={1}
                    />
                  </Tabs>
                </Box>
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item>
          <Typography> : </Typography>
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopTimePicker
              open={openStartTimePicker}
              onClose={() => setOpenStartTimePicker(false)}
              label="Basic example"
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
              renderInput={({ inputRef, inputProps, disabled, onChange, value }) => (
                <Box ref={inputRef} sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <input style={{ display: 'disable' }} onChange={onChange} disabled={disabled} {...inputProps} /> */}
                  {inputProps?.endAdornment}
                  <Tabs
                    // value={tabsValue}
                    onChange={handleChange}
                    variant="fullWidth"
                    sx={{
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
                  >
                    {/* <Tab label="Interview" value="1" /> */}
                    <Tab
                      label={startTime?.toLocaleString('en-US', {
                        hour: 'numeric', // numeric, 2-digit
                        minute: 'numeric' // numeric, 2-digit
                      })}
                      value={2}
                    />
                  </Tabs>
                </Box>
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Card>
  );
});
export default InterviewTabs;
