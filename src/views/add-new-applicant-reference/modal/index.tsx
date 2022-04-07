// THIRD-PARTY
import { Modal } from '@mui/material';
import { ReactNode } from 'react';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';

interface ModalProps {
  open: boolean;
  onModalClose: () => void;
  children: ReactNode;
  modalTitle?: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '5vh',
  left: '50%',
  transform: 'translate(-50%)',
  minWidth: 280,
  width: '80vw',
  height: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overFlow: 'hidden'
};

const ModalStyled = ({ open, onModalClose, modalTitle, children }: ModalProps) => (
  <Modal open={open} onClose={onModalClose}>
    <MainCard title={modalTitle && modalTitle} sx={{ ...style }}>
      {children}
    </MainCard>
  </Modal>
);

export default ModalStyled;
