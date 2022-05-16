import { Box, Button, Typography, Divider, Dialog, DialogTitle } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate } from 'react-router-dom';

interface InterviewDialogProps {
  handleClose: () => void;
  message: {
    rank: string;
    status: string;
  };
}

const InterviewDialog = ({ handleClose, message }: InterviewDialogProps) => {
  const navigate = useNavigate();
  const handleMessage = (dialogMessage: { rank: string; status: string }) => {
    switch (dialogMessage.status) {
      case 'fail':
        return (
          <Typography variant="body1" component="p" sx={{ color: '#e53935' }}>
            [Failed]: Knowledge of the applicant is not enough for rank <span style={{ fontWeight: 'bold' }}>{dialogMessage.rank}</span>.
          </Typography>
        );
      case 'pass':
        return (
          <Typography variant="body1" component="p" sx={{ color: '#43a047' }}>
            [Passed]: Knowledge of the applicant is eligible for rank <span style={{ fontWeight: 'bold' }}>{dialogMessage.rank}</span>.
          </Typography>
        );
      case 'advance':
        return (
          <Typography variant="body1" component="p" sx={{ color: '#43a047' }}>
            [Passed]: Applicant has a solid knowledge and eligible for rank <span style={{ fontWeight: 'bold' }}>{dialogMessage.rank}</span>
            .
          </Typography>
        );
      default:
        return (
          <Typography variant="body1" component="p" color="success">
            {dialogMessage.status}
          </Typography>
        );
    }
  };
  return (
    <Dialog onClose={handleClose} open={Boolean(message)}>
      <DialogTitle>Reference Evaluate</DialogTitle>
      <Divider />
      <Box sx={{ minWidth: 300, padding: '16px 24px' }}>
        {handleMessage(message)}
        <Box marginTop={6}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              onClick={async () => {
                await handleClose();
                navigate('/history');
              }}
            >
              go to history
            </Button>
          </AnimateButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export default InterviewDialog;
