// THIRD-PARTY
import { forwardRef, SyntheticEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, SlideProps, TextField } from '@mui/material';
// PROJECT IMPORTS
import { gridSpacing } from 'store/constant';
import { useSelector } from 'store';

const Transition = forwardRef((props: SlideProps, ref) => <Slide direction="left" ref={ref} {...props} />);

interface InfoRankProps {
  open: boolean;
  handleCloseDialog: (e: SyntheticEvent) => void;
  id: string;
}

const InfoRank = ({ open, handleCloseDialog, id }: InfoRankProps) => {
  const { ranks } = useSelector((state) => state.rank);
  const rankById = ranks.filter((item) => item.id === id);
  // useEffect(() => {
  //   dispatch(GetDetailRank(id));
  // });
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      sx={{
        '&>div:nth-of-type(3)': {
          '&>div': {
            m: 0,
            borderRadius: '0px',
            width: 850,
            maxWidth: 850,
            maxHeight: '100%'
          }
        }
      }}
    >
      {open && (
        <>
          <DialogTitle>Rank Infomation</DialogTitle>
          <DialogContent>
            <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  InputProps={{
                    readOnly: true
                  }}
                  fullWidth
                  label="Name*"
                  name="name"
                  defaultValue={rankById[0].name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  InputProps={{
                    readOnly: true
                  }}
                  fullWidth
                  label="Description*"
                  name="description"
                  defaultValue={rankById[0].description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="status"
                  InputProps={{
                    readOnly: true
                  }}
                  fullWidth
                  label="Status*"
                  name="status"
                  defaultValue={rankById[0].status}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="text" color="error" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default InfoRank;
