/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import axios from 'utils/axios';
import { useSelector } from 'store';

export default function NotificationsPage() {
  // const [header, setHeader] = React.useState('');
  // const [message, setMessage] = React.useState('');

  // useEffect(() => {
  //   const getMessage = async () => {
  //     try {
  //       const ME_URL = `${process.env.REACT_APP_API_URL}/v1/me`;
  //       const response = await axios.get(ME_URL);
  //       Wrong Here
  //       setHeader(response.data.success.name);
  //       setMessage(response.data.success.email);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getMessage();
  // }, []);

  // const showNotification = async () => {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const newNotification = new Notification(header, {
  //     body: message
  //   });
  // };

  if (Notification.permission === 'granted') {
    console.log('Permission are Granted!');
    showNotification();
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        showNotification();
      }
    });
  }
}

export async function showNotification() {
  const ME_URL = `${process.env.REACT_APP_API_URL}/v1/me`;
  const response = await axios.get(ME_URL);
  const header = response.data.success.name;
  const message = response.data.success.email;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const newNotification = new Notification(header, {
    body: message
  });
}
