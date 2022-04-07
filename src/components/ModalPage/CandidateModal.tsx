// THIRD PARTY
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Typography, Modal, Divider } from '@mui/material';
import { Formik } from 'formik';

// PROJECT IMPORT

const UserModal = (props: any) => {
  const { dataEdit, visible } = props;
  const [visibleModal, setVisibleModal] = useState(false);
  const [checkFirst, setCheckFirst] = useState(true);

  useEffect(() => {
    if (!visible && checkFirst) {
      setCheckFirst(false);
    } else {
      // getOne(dataEdit?.id);
      changeModal('show');
    }
  }, [visible]);

  const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    bgcolor: 'background.paper',
    border: '1px solid gray',
    boxShadow: 24,
    p: 3,
    pt: 2
  };

  const changeModal = (type: string) => {
    if (type === 'close') {
      setVisibleModal(false);
    } else {
      setVisibleModal(true);
    }
  };

  return (
    <>
      <Modal
        open={visibleModal}
        onClose={() => changeModal('close')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Thông tin ứng viên
          </Typography>
          <Divider />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Tên người dùng: {dataEdit?.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Số điện thoại: {dataEdit?.phone}
          </Typography>{' '}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email: {dataEdit?.email}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default UserModal;
