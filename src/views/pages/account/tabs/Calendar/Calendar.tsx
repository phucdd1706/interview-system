/* eslint-disable @typescript-eslint/no-unused-vars */
// THIRD-PARTY
import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Grid from '@mui/material/Grid';
import { Alert, Button, useTheme } from '@mui/material';
import FullCalendar, { DateSelectArg, EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import viLocale from '@fullcalendar/core/locales/vi';
import enLocale from '@fullcalendar/core/locales/en-gb';
import viPickerLocale from 'date-fns/locale/vi';
import enPickerLocale from 'date-fns/locale/en-US';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';

// PROJECT IMPORTS
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';
import ViewEventDialog from './ViewEventDialog';
import SelectDialog from './SelectDialog';
import './calendar.css';
import Locales from 'ui-component/Locales';

export default function SubComponentsPickers() {
  const theme = useTheme();
  const [date, setDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const calendarRef = React.useRef<any>([]);
  const [goToDate, setGoToDate] = useState(new Date());
  const [openEvent, setOpenEvent] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<any>();
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [selectInfo, setSelectInfo] = useState<any>();

  const dataEvent = [
    { title: 'Event 1', start: '2022-05-06T10:36:24', end: '2022-05-06T16:36:24', date: '2022-05-06' },
    { title: 'Event 10', start: '2022-05-08T10:36:24', end: '2022-05-08T16:36:24' },
    { title: 'Event 3', date: '2022-05-06', color: '#E53935' },
    { title: 'Event 4', date: '2022-05-06' },
    { title: 'Event 5', date: '2022-05-06' },
    { title: 'Event 2', date: '2022-05-07' }
  ];
  const { locale } = useConfig();
  const localeMap = {
    en: enPickerLocale,
    vi: viPickerLocale
  };

  React.useEffect(() => {
    setStartDate(date);
    setEndDate(date);
  }, [date]);

  // const start = new Date();
  // startDate.setHours(0, 0, 0, 0);
  // const startTime = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString();

  // endDate.setHours(23, 59, 59, 999);
  // const endTime = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString();

  const handlePickDate = async (newDate: Date | null) => {
    await setDate(newDate || new Date());
    await setGoToDate(newDate || new Date());
    // console.log(newDate, goToDate);
    // // Ref to previos ref?
    newDate && calendarRef.current.getApi().gotoDate(new Date(newDate));
  };

  let eventGuid = 0;
  // eslint-disable-next-line no-plusplus
  const createEventId = () => String(eventGuid++);

  // alert(arg.dateStr);
  const handleDateClick = (arg: { dateStr: any }) => {
    <Alert severity="success">This is a success alert — {arg.dateStr}!</Alert>;
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setEventInfo(clickInfo.event);
    setOpenEvent((prevState: any) => !prevState);
  };

  const handleEventClose = () => {
    setOpenEvent(false);
  };

  const handleDataSelect = (selectInformation: DateSelectArg) => {
    setSelectInfo(selectInformation);
    setDate(new Date(selectInformation.startStr));
    setOpenSelect((prevState: any) => !prevState);
    // const title = prompt(`Please enter a new title for your event from ${selectInfo.startStr} to ${selectInfo.endStr}`);
    // const calendarApi = selectInfo.view.calendar;
    // console.log(selectInfo);
    // calendarApi.unselect(); // clear date selection
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  };

  // const renderEventContent = (eventInfo: any) => {
  //   console.log(`Detail Event${eventInfo.timeText}, ${eventInfo.title}`);
  // };

  return (
    <MainCard>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale === 'vi' ? viPickerLocale : enPickerLocale}>
        <Grid container spacing={3} alignContent="center">
          <Grid item xs={12} md={4}>
            <MainCard>
              <CalendarPicker date={date} onChange={handlePickDate} ref={calendarRef} />
            </MainCard>
          </Grid>
          <Grid item xs={12} md={8}>
            <MainCard>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={calendarRef}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                customButtons={{
                  prev: {
                    click() {
                      calendarRef.current.getApi().prev();
                      switch (calendarRef.current.getApi().view.type) {
                        case 'timeGridDay': {
                          const nextDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
                          setDate(nextDate);
                          break;
                        }
                        case 'timeGridWeek': {
                          const nextDate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
                          setDate(nextDate);
                          break;
                        }
                        case 'dayGridMonth': {
                          const nextDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
                          setDate(nextDate);
                          break;
                        }
                        default: {
                          console.error('Some Error Occurred while click next button');
                          break;
                        }
                      }
                    }
                  },
                  next: {
                    click() {
                      calendarRef.current.getApi().next();
                      switch (calendarRef.current.getApi().view.type) {
                        case 'timeGridDay': {
                          const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
                          setDate(nextDay);
                          break;
                        }
                        case 'timeGridWeek': {
                          const nextWeek = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
                          setDate(nextWeek);
                          break;
                        }
                        case 'dayGridMonth': {
                          const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
                          setDate(nextMonth);
                          break;
                        }
                        default: {
                          console.error('Some Error Occurred while click next button');
                          break;
                        }
                      }
                    }
                  }
                }}
                initialView="dayGridMonth"
                // dateClick={handleDateClick}
                events={dataEvent} // Event Init
                eventClick={handleEventClick}
                // eventContent={renderEventContent}
                editable
                selectable // Select Event Enable
                selectMirror
                select={handleDataSelect}
                locale={locale === 'vi' ? 'viLocale' : ''}
                dayMaxEvents
                nowIndicator
                handleWindowResize
                progressiveEventRendering
                dayMaxEventRows
                stickyFooterScrollbar
              />
            </MainCard>
          </Grid>
        </Grid>
        <SelectDialog open={openSelect} setOpen={setOpenSelect} selectInfo={selectInfo} createEventId={createEventId} />
        <ViewEventDialog open={openEvent} setOpen={setOpenEvent} eventInfo={eventInfo} />
      </LocalizationProvider>
    </MainCard>
  );
}
