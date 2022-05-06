import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { Autocomplete, Box, Button, Card, Chip, Grid, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material';
import { RefObject } from '../SelectDialog';
import DatePicker from '@mui/lab/DatePicker/DatePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker/DesktopTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';

// ICONS IMPORT
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EventIcon from '@mui/icons-material/Event';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import SubjectIcon from '@mui/icons-material/Subject';

const InterviewTabs = forwardRef((props: { selectInfo: any }, selectRef: Ref<RefObject>) => {
  const theme = useTheme();
  const { selectInfo } = props;
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(new Date(selectInfo.start));
  const [endTime, setEndTime] = useState<Date | null>(new Date(selectInfo.end));
  const [tabsValue, setTabsValue] = useState(1);

  useImperativeHandle(selectRef, () => ({ SayHi, startTime, endTime }));

  function SayHi() {
    // eslint-disable-next-line no-alert
    alert(`${selectInfo?.start}`);
  }

  // Fake Candidate list
  const candidateList = [
    { name: 'Alexa', rank: 'intern' },
    { name: 'Bob', rank: 'fresher' }
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 1:
        setOpenStartDatePicker(() => !openStartDatePicker);
        break;
      case 2:
        setOpenStartTimePicker(() => !openStartTimePicker);
        break;
      case 3:
        setOpenEndDatePicker(() => !openEndDatePicker);
        break;
      case 44:
        setOpenEndTimePicker(() => !openEndTimePicker);
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
        <Grid item container justifyContent="flex-start" alignItems="center" md={12}>
          <Grid item alignItems="center" md={1.3}>
            <AccessTimeIcon fontSize="small" />
          </Grid>
          <Grid item md={1.3}>
            <Typography variant="subtitle1">Start: </Typography>
          </Grid>
          <Grid item md={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                open={openStartDatePicker}
                onClose={() => setOpenStartDatePicker(false)}
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
          <Grid item md={3}>
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
        <Grid item container justifyContent="flex-start" alignItems="center">
          <Grid item alignItems="center" md={1.3}>
            <></>
          </Grid>
          <Grid item md={1.3}>
            <Typography variant="subtitle1">End: </Typography>
          </Grid>
          <Grid item md={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                open={openEndDatePicker}
                onClose={() => setOpenEndDatePicker(false)}
                label="Basic example"
                value={endTime}
                onChange={(newValue) => {
                  setEndTime(newValue);
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
                          endTime?.toLocaleString('en-US', {
                            weekday: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            month: 'long'
                          }) || ''
                        }
                        value={3}
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
          <Grid item md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopTimePicker
                open={openEndTimePicker}
                onClose={() => setOpenEndTimePicker(false)}
                label="Basic example"
                value={endTime}
                onChange={(newValue) => {
                  setEndTime(newValue);
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
                        label={endTime?.toLocaleString('en-US', {
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
        <Grid item container justifyContent="flex-start" alignItems="center">
          <Grid item md={1.3}>
            <MeetingRoomIcon />
          </Grid>
          <Grid item md={9.1}>
            <Button fullWidth variant="contained" target="_blank" href="https://meet.google.com/">
              Add Google Meet
            </Button>
          </Grid>
        </Grid>
        <Grid item container justifyContent="flex-start" alignItems="center" marginTop={2}>
          <Grid item md={1.3}>
            <PeopleAltOutlinedIcon />
          </Grid>
          <Grid item md={9.1}>
            <Autocomplete
              multiple
              id="tags-filled"
              options={candidateList.map((option) => option.name)}
              defaultValue={[candidateList[0].name]}
              freeSolo
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
              }
              renderInput={(params) => <TextField {...params} variant="filled" label="freeSolo" placeholder="Favorites" />}
            />
          </Grid>
        </Grid>
        <Grid item container justifyContent="flex-start" alignItems="center" marginTop={2}>
          <Grid item md={1.3}>
            <AddLocationIcon />
          </Grid>
          <Grid item md={9.1}>
            <TextField fullWidth label="Add Location" size="small" />
          </Grid>
        </Grid>
        <Grid item container justifyContent="flex-start" alignItems="center" marginTop={2}>
          <Grid item md={1.3}>
            <SubjectIcon />
          </Grid>
          <Grid item md={9.1}>
            <TextField fullWidth label="Add More Description" size="small" />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
});

export default InterviewTabs;
