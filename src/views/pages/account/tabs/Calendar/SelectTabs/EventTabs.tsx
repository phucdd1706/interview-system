import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { RefObject } from '../SelectDialog';

import DatePicker from '@mui/lab/DatePicker/DatePicker';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker/DesktopTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LoopIcon from '@mui/icons-material/Loop';
import SubjectIcon from '@mui/icons-material/Subject';

const EventTabs = forwardRef((props: { selectInfo: any }, selectRef: Ref<RefObject>) => {
  const theme = useTheme();
  const { selectInfo } = props;
  const [startTime, setStartTime] = useState<Date | null>(new Date(selectInfo.start));
  const [endTime, setEndTime] = useState<Date | null>(new Date(selectInfo.end));
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);
  const [checked, setChecked] = React.useState(false);

  useImperativeHandle(selectRef, () => ({ SayHi, startTime, endTime }));
  function SayHi() {
    // eslint-disable-next-line no-alert
    alert(`${selectInfo?.start}`);
  }

  const [loopOptions, setLoopOptions] = React.useState('');

  const handleBoxChange = (event: SelectChangeEvent) => {
    setLoopOptions(event.target.value as string);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 1:
        setOpenStartDatePicker(() => !openStartDatePicker);
        break;
      case 2:
        setOpenStartTimePicker(() => !openStartTimePicker);
        break;
      default:
        console.error('Some Error Occurred While Choose Date or Time');
    }
  };

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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
        <Grid item container justifyContent="flex-start" alignItems="center" marginTop={2}>
          <Grid item md={1.3}>
            <SubjectIcon />
          </Grid>
          <Grid item md={9.1}>
            <TextField fullWidth id="description-static" label="Add Description" multiline rows={4} variant="filled" />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
});

export default EventTabs;
