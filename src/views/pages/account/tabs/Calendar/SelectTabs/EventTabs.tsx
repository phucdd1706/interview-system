import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { Card, Grid, Typography, useTheme } from '@mui/material';
import { RefObject } from '../SelectDialog';

const EventTabs = forwardRef((props: { selectInfo: any }, selectRef: Ref<RefObject>) => {
  const theme = useTheme();
  const FileTitle = 'Event Tabs';
  const { selectInfo } = props;
  useImperativeHandle(selectRef, () => ({ SayHi, FileTitle }));
  function SayHi() {
    // eslint-disable-next-line no-alert
    alert(`${selectInfo?.start}`);
  }
  return (
    <Card>
      <Grid container>
        <Grid item>
          <Typography>{FileTitle}</Typography>
          <Typography>{selectInfo.startStr}</Typography>
        </Grid>
        <Grid item marginLeft={2}>
          <Typography> Item 2</Typography>
        </Grid>
      </Grid>
    </Card>
  );
});
export default EventTabs;
