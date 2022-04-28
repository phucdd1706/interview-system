/* eslint-disable @typescript-eslint/no-unused-vars */
// THIRD-PARTY
import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';
import FullCalendar, { DateSelectArg, EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Calendar } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import ViewEventDialog from './ViewEventDialog';
import SelectDialog from './SelectDialog';
import './calendar.css';

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
    { title: 'event 1', start: '2022-04-26T10:36:24', end: '2022-04-26T16:36:24', date: '2022-04-26' },
    { title: 'event 10', start: '2022-04-28T10:36:24', end: '2022-04-28T16:36:24' },
    { title: 'event 3', date: '2022-04-26', color: '#E53935' },
    { title: 'event 4', date: '2022-04-26' },
    { title: 'event 5', date: '2022-04-26' },
    { title: 'event 2', date: '2022-04-27' }
  ];

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
    console.log('newDate: ', newDate);
    await setDate(newDate || new Date());
    await setGoToDate(newDate || new Date());
    // console.log(newDate, goToDate);
    // // Ref to previos ref?
    newDate && calendarRef.current.getApi().gotoDate(new Date(newDate));
  };

  let eventGuid = 0;
  // eslint-disable-next-line no-plusplus
  const createEventId = () => String(eventGuid++);

  const handleDateClick = (arg: { dateStr: any }) => {
    alert(arg.dateStr);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    // alert(`Detail Event ${clickInfo.event.start?.toLocaleTimeString()}`);
    setEventInfo(clickInfo.event);
    setOpenEvent((prevState: any) => !prevState);
  };

  const handleEventClose = () => {
    setOpenEvent(false);
  };

  const handleDataSelect = (selectInformation: DateSelectArg) => {
    setSelectInfo(selectInformation);
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3} alignContent="center">
          <Grid item xs={12} md={4}>
            <MainCard>
              <CalendarPicker date={date} onChange={handlePickDate} />
            </MainCard>
          </Grid>
          <Grid item xs={12} md={8}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              ref={calendarRef}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              initialView="dayGridMonth"
              // dateClick={handleDateClick}
              events={dataEvent}
              eventClick={handleEventClick}
              // eventContent={renderEventContent}
              editable
              selectable
              selectMirror
              select={handleDataSelect}
              dayMaxEvents
              nowIndicator
              handleWindowResize
              progressiveEventRendering
              dayMaxEventRows
            />
          </Grid>
        </Grid>
        <ViewEventDialog open={openEvent} setOpen={setOpenEvent} eventInfo={eventInfo} />
      </LocalizationProvider>
    </MainCard>
  );
}
