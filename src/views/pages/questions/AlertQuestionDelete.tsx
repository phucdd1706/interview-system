// THIRD-PARTY
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

// PROJECT IMPORTS
interface Props {
  open: boolean;
  indexId: number;
  handleClose: (status: boolean) => void;
}

export default function AlertQuestionDelete({ open, handleClose, indexId }: Props) {
  const questionState = useSelector((state: RootState) => state.question);
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      keepMounted
      maxWidth="xs"
      aria-labelledby="item-delete-title"
      aria-describedby="item-delete-description"
    >
      {open && (
        <>
          <DialogTitle id="item-delete-title">
            {`"Question ${20 * (questionState.currentPage - 1) + indexId + 1}" - Are you sure you want to delete?`}
          </DialogTitle>
          ]{' '}
          <DialogActions sx={{ mr: 2 }}>
            <Button onClick={() => handleClose(false)} color="error">
              Cancel
            </Button>
            <Button variant="contained" size="small" onClick={() => handleClose(true)} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
